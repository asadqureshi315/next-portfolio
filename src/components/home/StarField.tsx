"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Prevent scrolling
    document.body.style.overflow = "hidden";

    // Match canvas size to parent EXACTLY
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const scene = new THREE.Scene();

    // Use InstancedMesh to render 50,000 stars efficiently
    const numStars = 50000;
    const geometry = new THREE.SphereGeometry(0.3, 16, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const stars = new THREE.InstancedMesh(geometry, material, numStars);

    const dummy = new THREE.Object3D();
    for (let i = 0; i < numStars; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
      dummy.updateMatrix();
      stars.setMatrixAt(i, dummy.matrix);
    }
    scene.add(stars);

    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();

    let lastTime = 0;
    // const animate = (time = 0) => {
    //   requestAnimationFrame(animate);
    //   const delta = time - lastTime;
    //   if (delta < 16) return; // Limit to ~60 FPS
    //   lastTime = time;

    //   currentRotation.lerp(targetRotation, 0.1);
    //   stars.rotation.x = currentRotation.y;
    //   stars.rotation.y = currentRotation.x;

    //   renderer.render(scene, camera);
    // };

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotation.lerp(targetRotation, 1);

      stars.rotation.x = currentRotation.y;
      stars.rotation.y = currentRotation.x;

      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing efficiently
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Handle mouse movement
    const handleMouseMove = (event: MouseEvent) => {
      targetRotation.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetRotation.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Handle touch movement (for mobile)
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]; // Get first touch point
        targetRotation.x = (touch.clientX / window.innerWidth) * 2 - 1;
        targetRotation.y = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
    />
  );
}
