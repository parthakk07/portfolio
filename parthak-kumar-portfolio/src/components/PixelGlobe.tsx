import { useEffect, useRef } from "react";
import * as THREE from "three";
import profileFront from "../assets/images/user_avatar_1780960461329.png";
import animeBack from "../assets/images/anime.jpeg";
import thirdFace from "../assets/images/third-crop.jpeg";

type PixelGlobeProps = {
  className?: string;
  onTap?: () => void;
};

const VERTEX = `
  varying vec3 vObj;
  varying vec3 vWorldNormal;
  void main() {
    vObj = normalize(position);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = `
  uniform sampler2D uA;
  uniform sampler2D uB;
  uniform sampler2D uC;
  varying vec3 vObj;
  varying vec3 vWorldNormal;

  const float PI = 3.14159265;
  const float TAU = 6.2831853;
  const float TAU3 = 2.0943951;
  const float HALF = 1.04719755;

  float wrapPi(float a) {
    return a - TAU * floor((a + PI) / TAU);
  }

  vec2 faceUv(float local, float ny) {
    vec2 p = vec2(local * 0.72, (ny + 0.16) * 0.72);
    return clamp(p * 0.5 + 0.5, 0.0, 1.0);
  }

  void main() {
    vec3 n = normalize(vObj);
    float ang = atan(n.x, n.z);

    float dA = abs(wrapPi(ang));
    float dB = abs(wrapPi(ang - TAU3));
    float dC = abs(wrapPi(ang + TAU3));

    float edge = 0.18;
    float wA = 1.0 - smoothstep(HALF - edge, HALF + edge, dA);
    float wB = 1.0 - smoothstep(HALF - edge, HALF + edge, dB);
    float wC = 1.0 - smoothstep(HALF - edge, HALF + edge, dC);
    float s = max(wA + wB + wC, 1e-4);
    wA /= s; wB /= s; wC /= s;

    vec4 tA = texture2D(uA, faceUv(wrapPi(ang) / HALF, n.y));
    vec4 tB = texture2D(uB, faceUv(wrapPi(ang - TAU3) / HALF, n.y));
    vec4 tC = texture2D(uC, faceUv(wrapPi(ang + TAU3) / HALF, n.y));
    vec4 tex = tA * wA + tB * wB + tC * wC;

    vec3 lightDir = normalize(vec3(0.45, 0.55, 1.0));
    float lambert = 0.66 + 0.34 * max(dot(normalize(vWorldNormal), lightDir), 0.0);
    float rim = pow(1.0 - max(dot(normalize(vWorldNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.2) * 0.12;
    vec3 color = tex.rgb * lambert + vec3(rim);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function PixelGlobe({ className = "", onTap }: PixelGlobeProps) {
  const homeRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const onTapRef = useRef(onTap);
  onTapRef.current = onTap;

  useEffect(() => {
    const home = homeRef.current;
    const ball = ballRef.current;
    if (!home || !ball) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.pointerEvents = "none";
    ball.appendChild(canvas);

    const fitRenderer = (cssSize: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const px = Math.max(64, Math.round(cssSize * dpr));
      if (renderer.domElement.width !== px) {
        renderer.setPixelRatio(1);
        renderer.setSize(px, px, false);
      }
    };

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    camera.position.z = 3.05;

    const loader = new THREE.TextureLoader();
    const mapA = loader.load(profileFront);
    const mapB = loader.load(animeBack);
    const mapC = loader.load(thirdFace);
    for (const map of [mapA, mapB, mapC]) {
      map.colorSpace = THREE.SRGBColorSpace;
      map.flipY = true;
      map.minFilter = THREE.LinearMipmapLinearFilter;
      map.magFilter = THREE.LinearFilter;
    }

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uA: { value: mapA },
        uB: { value: mapB },
        uC: { value: mapC },
      },
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
    });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), material);
    scene.add(mesh);

    const spin = { y: 0.2, x: 0.08, vy: reduced ? 0 : 0.42 };
    const body = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 72,
      held: false,
      moved: false,
      settled: true,
      grabX: 0,
      grabY: 0,
      lastX: 0,
      lastY: 0,
      lastT: 0,
      freeUntil: 0,
    };

    const readArena = () => {
      const banner = document.getElementById("hero-banner");
      const homeBox = home.getBoundingClientRect();
      const b = banner ? banner.getBoundingClientRect() : homeBox;
      const pad = 2;
      return {
        minX: b.left + body.r + pad,
        maxX: b.right - body.r - pad,
        minY: b.top + body.r + pad,
        maxY: window.innerHeight * 2,
      };
    };

    const clampArena = (x: number, y: number) => {
      const a = readArena();
      const minX = Math.min(a.minX, a.maxX);
      const maxX = Math.max(a.minX, a.maxX);
      const minY = Math.min(a.minY, a.maxY);
      const maxY = Math.max(a.minY, a.maxY);
      return {
        x: Math.min(maxX, Math.max(minX, x)),
        y: Math.min(maxY, Math.max(minY, y)),
        minX,
        maxX,
        minY,
        maxY,
      };
    };

    const readHome = () => {
      const box = home.getBoundingClientRect();
      body.r = Math.max(box.width, box.height) / 2;
      return { x: box.left + box.width / 2, y: box.top + box.height / 2, size: box.width };
    };

    const placeBall = (size: number, docked: boolean) => {
      fitRenderer(size);
      if (docked) {
        ball.style.position = "absolute";
        ball.style.left = "0";
        ball.style.top = "0";
        ball.style.width = "100%";
        ball.style.height = "100%";
        ball.style.zIndex = "5";
        return;
      }
      ball.style.position = "fixed";
      ball.style.zIndex = "80";
      ball.style.width = `${size}px`;
      ball.style.height = `${size}px`;
      ball.style.left = `${body.x - size / 2}px`;
      ball.style.top = `${body.y - size / 2}px`;
    };

    const snapHome = () => {
      const h = readHome();
      body.x = h.x;
      body.y = h.y;
      body.vx = 0;
      body.vy = 0;
      body.settled = true;
      placeBall(h.size, true);
    };

    snapHome();

    const clock = new THREE.Clock();
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      raf = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.04);
      const h = readHome();

      if (!body.held) {
        if (body.settled) {
          placeBall(h.size, true);
          if (!reduced) {
            spin.y += spin.vy * dt;
            spin.vy += (-0.42 - spin.vy) * (1 - Math.exp(-1.4 * dt));
          }
          mesh.rotation.order = "YXZ";
          mesh.rotation.y = spin.y;
          mesh.rotation.x = spin.x;
          renderer.render(scene, camera);
          return;
        }
          const homing = performance.now() > body.freeUntil;
          if (!homing) {
            body.vy += 520 * dt;
          } else {
            body.vx += (h.x - body.x) * 1.5 * dt;
            body.vy += (h.y - body.y) * 1.5 * dt;
          }
          const damp = Math.exp((homing ? -1.1 : -0.55) * dt);
          body.vx *= damp;
          body.vy *= damp;
          body.x += body.vx * dt;
          body.y += body.vy * dt;

          const a = clampArena(body.x, body.y);
          const rest = 0.38;
          if (body.x <= a.minX) {
            body.x = a.minX;
            body.vx = Math.abs(body.vx) * rest;
          } else if (body.x >= a.maxX) {
            body.x = a.maxX;
            body.vx = -Math.abs(body.vx) * rest;
          } else {
            body.x = a.x;
          }
          if (body.y <= a.minY) {
            body.y = a.minY;
            body.vy = Math.abs(body.vy) * rest;
          }

          const dx = h.x - body.x;
          const dy = h.y - body.y;
          const speed = Math.hypot(body.vx, body.vy);
          if (homing && dx * dx + dy * dy < 9 && speed < 22) {
            body.x = h.x;
            body.y = h.y;
            body.vx = 0;
            body.vy = 0;
            body.settled = true;
            placeBall(h.size, true);
            return;
          }
      }

      placeBall(h.size, false);

      if (!reduced) {
        spin.y += spin.vy * dt;
        spin.vy += (-0.42 - spin.vy) * (1 - Math.exp(-1.4 * dt));
      }
      mesh.rotation.order = "YXZ";
      mesh.rotation.y = spin.y;
      mesh.rotation.x = spin.x;
      renderer.render(scene, camera);
    };

    const onDown = (e: PointerEvent) => {
      e.preventDefault();
      const h = readHome();
      if (body.settled) {
        body.x = h.x;
        body.y = h.y;
      }
      body.held = true;
      body.moved = false;
      body.settled = false;
      body.vx = 0;
      body.vy = 0;
      body.grabX = e.clientX - body.x;
      body.grabY = e.clientY - body.y;
      body.lastX = e.clientX;
      body.lastY = e.clientY;
      body.lastT = performance.now();
      ball.style.cursor = "grabbing";
      placeBall(h.size, false);
      ball.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!body.held) return;
      const now = performance.now();
      const dx = e.clientX - body.lastX;
      const dy = e.clientY - body.lastY;
      if (Math.hypot(dx, dy) > 3) body.moved = true;
      const dt = Math.max((now - body.lastT) / 1000, 1 / 120);
      body.x = e.clientX - body.grabX;
      body.y = e.clientY - body.grabY;
      const a = clampArena(body.x, body.y);
      body.x = a.x;
      body.y = a.y;
      body.vx = dx / dt;
      body.vy = dy / dt;
      body.lastX = e.clientX;
      body.lastY = e.clientY;
      body.lastT = now;
    };

    const onUp = (e: PointerEvent) => {
      if (!body.held) return;
      body.held = false;
      ball.style.cursor = "grab";
      try {
        ball.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
      const cap = 1400;
      body.vx = Math.max(-cap, Math.min(cap, body.vx));
      body.vy = Math.max(-cap, Math.min(cap, body.vy));
      if (!body.moved) {
        body.settled = true;
        snapHome();
        onTapRef.current?.();
      } else {
        body.freeUntil = performance.now() + 800;
      }
    };

    ball.addEventListener("pointerdown", onDown);
    ball.addEventListener("pointermove", onMove);
    ball.addEventListener("pointerup", onUp);
    ball.addEventListener("pointercancel", onUp);
    window.addEventListener("resize", snapHome);

    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", snapHome);
      ball.removeEventListener("pointerdown", onDown);
      ball.removeEventListener("pointermove", onMove);
      ball.removeEventListener("pointerup", onUp);
      ball.removeEventListener("pointercancel", onUp);
      mesh.geometry.dispose();
      material.dispose();
      mapA.dispose();
      mapB.dispose();
      mapC.dispose();
      renderer.dispose();
      if (canvas.parentNode === ball) ball.removeChild(canvas);
    };
  }, []);

  return (
    <div ref={homeRef} className={className} style={{ position: "relative", width: "100%", height: "100%" }}>
      <div
        ref={ballRef}
        title="hold and throw — bounces on the edges, then comes home"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          borderRadius: "50%",
          overflow: "hidden",
          cursor: "grab",
          touchAction: "none",
          userSelect: "none",
          boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
        }}
      />
    </div>
  );
}
