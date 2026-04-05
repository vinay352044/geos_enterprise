'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

/**
 * Full-bleed animated aurora shader background.
 *
 * Mounts a Three.js canvas that fills its nearest positioned ancestor
 * via explicit `top/right/bottom/left: 0` + `width/height: 100%`. The
 * parent is observed with `ResizeObserver` so the drawing buffer always
 * matches the real rendered height — critical for `min-h-[100svh]`
 * sections whose content grows taller than the viewport minimum.
 *
 * Performance notes:
 * - DPR is capped at 1. On Retina this is a 4× pixel reduction with
 *   negligible visual impact for a soft organic shader.
 * - Internal buffer is downscaled to 0.75× CSS size; the canvas CSS
 *   stays at 100% so the browser upscales it for free.
 * - Render loop throttles to ~40fps (25ms budget).
 * - Rendering pauses when the section scrolls out of view
 *   (IntersectionObserver) and when the tab is hidden
 *   (visibilitychange). This is the biggest real-world win — users
 *   spend most of their time past the hero.
 */
export function AnimatedShaderBackground() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return

    // The element we measure for sizing is the host itself — which is
    // absolutely positioned to fill its positioned ancestor (the hero
    // section). Its clientWidth/Height reflects the actual rendered
    // height of that section, including any content that pushes it
    // beyond `min-h-[100svh]`.
    const getSize = () => ({
      w: host.clientWidth,
      h: host.clientHeight,
    })

    const BUFFER_SCALE = 0.75 // render at 75% then upscale via CSS
    const FRAME_INTERVAL_MS = 1000 / 40 // ~40fps

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    const renderer = new THREE.WebGLRenderer({
      antialias: false, // soft shader — AA unnecessary and expensive
      alpha: true,
      powerPreference: 'high-performance',
    })
    renderer.setPixelRatio(1) // cap at 1 regardless of DPR — huge perf win

    const canvas = renderer.domElement
    canvas.style.position = 'absolute'
    canvas.style.top = '0'
    canvas.style.left = '0'
    canvas.style.right = '0'
    canvas.style.bottom = '0'
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    canvas.style.display = 'block'
    host.appendChild(canvas)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(1, 1) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;

        #define NUM_OCTAVES 3

        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }

        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);

          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
          return res * res;
        }

        float fbm(vec2 x) {
          float v = 0.0;
          float a = 0.3;
          vec2 shift = vec2(100);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < NUM_OCTAVES; ++i) {
            v += a * noise(x);
            x = rot * x * 2.0 + shift;
            a *= 0.4;
          }
          return v;
        }

        void main() {
          vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
          vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
          vec2 v;
          vec4 o = vec4(0.0);

          float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

          for (float i = 0.0; i < 35.0; i++) {
            v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
            float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / 35.0));
            vec4 auroraColors = vec4(
              0.1 + 0.3 * sin(i * 0.2 + iTime * 0.4),
              0.3 + 0.5 * cos(i * 0.3 + iTime * 0.5),
              0.7 + 0.3 * sin(i * 0.4 + iTime * 0.3),
              1.0
            );
            vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
            float thinnessFactor = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
            o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
          }

          o = tanh(pow(o / 100.0, vec4(1.6)));
          gl_FragColor = o * 1.5;
        }
      `,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Resize: drawing buffer is scaled down, CSS stays 100%, browser
    // upscales. Re-assert the CSS dimensions after every setSize
    // because three.js rewrites them.
    const resize = () => {
      const { w, h } = getSize()
      if (w === 0 || h === 0) return
      renderer.setSize(w * BUFFER_SCALE, h * BUFFER_SCALE, false)
      canvas.style.width = '100%'
      canvas.style.height = '100%'
      material.uniforms.iResolution.value.set(w * BUFFER_SCALE, h * BUFFER_SCALE)
    }

    resize()
    const rafInitialId = requestAnimationFrame(resize)

    const observer = new ResizeObserver(resize)
    observer.observe(host)

    // Pause rendering when offscreen or tab hidden.
    let isVisible = true
    let isTabVisible = !document.hidden

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) isVisible = entry.isIntersecting
      },
      { threshold: 0 },
    )
    io.observe(host)

    const onVisibility = () => {
      isTabVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', onVisibility)

    // Throttled render loop.
    const clock = new THREE.Clock()
    let frameId = 0
    let lastFrameAt = 0

    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate)
      if (!isVisible || !isTabVisible) return
      if (now - lastFrameAt < FRAME_INTERVAL_MS) return
      lastFrameAt = now
      material.uniforms.iTime.value += clock.getDelta()
      renderer.render(scene, camera)
    }
    frameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(frameId)
      cancelAnimationFrame(rafInitialId)
      observer.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
      if (canvas.parentNode === host) host.removeChild(canvas)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    />
  )
}
