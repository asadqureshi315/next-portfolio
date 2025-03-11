"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import {
  ArrowBigRight,
  ArrowRight,
  FanIcon,
  ShipWheel,
  User,
} from "lucide-react";

export default function Home() {
  const canvasRef = useRef(null);
  const mouseRef = useRef(new THREE.Vector2());

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setClearColor(new THREE.Color(0x000000), 1.0);

    const fov = 75;
    const aspect = window.innerWidth / window.innerHeight;
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 100;

    const scene = new THREE.Scene();

    const starGeometry = new THREE.SphereGeometry(0.3, 24, 24);

    const stars = new THREE.Group();

    for (let i = 0; i < 30000; i++) {
      // const hue = Math.random() * 360
      // const saturation = Math.random() * 30 + 70
      // const lightness = Math.random() * 20 + 40

      const starMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(0xffffff),
        // color: new THREE.Color(`hsl(${hue}, ${saturation}%, ${lightness}%)`),
      });

      const star = new THREE.Mesh(starGeometry, starMaterial);

      star.position.set(
        Math.random() * window.innerWidth - window.innerWidth / 2,
        Math.random() * window.innerHeight - window.innerHeight / 2,
        Math.random() * 800 - 400
      );

      stars.add(star);
    }

    scene.add(stars);

    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();

    const animate = () => {
      requestAnimationFrame(animate);

      currentRotation.lerp(targetRotation, 1);

      stars.rotation.x = currentRotation.y;
      stars.rotation.y = currentRotation.x;

      renderer.render(scene, camera);
    };

    const resizeHandler = () => {
      const pixelRatio = window.devicePixelRatio;
      const width = window.innerWidth * pixelRatio;
      const height = window.innerHeight * pixelRatio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      renderer.setPixelRatio(pixelRatio);
    };

    const mouseMoveHandler = (event: any) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.x = mouseRef.current.x * 1;
      targetRotation.y = mouseRef.current.y * 1;
    };

    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    // window.addEventListener("mousemove", mouseMoveHandler);

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0]; // Get first touch point
        mouseRef.current.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(touch.clientY / window.innerHeight) * 2 + 1;

        targetRotation.x = mouseRef.current.x * 1;
        targetRotation.y = mouseRef.current.y * 1;
      }
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    animate();

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("mousemove", mouseMoveHandler);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className=" h-full overflow-hidden">
      <canvas
        id="star-canvas"
        ref={canvasRef}
        style={
          {
            //   width: "100%",
            //   height: "100%",
            //   top: 0,
            //   left: 0,
            //   overflow: "hidden",
          }
        }
        // className=" overflow-hidden"
      />
      <div className=" absolute top-28 left-5 md:top-36 md:left-10 lg:top-36 lg:left-16  mix-blend-difference">
        <div className=" flex">
          <h1 className="barcode text-7xl font-medium md:text-8xl lg:text-9xl text-white">
            Asad Qureshi
          </h1>
          <div className="w-26 flex justify-center">
            <div
              className="relative w-16 h-16 md:w-24 md:h-24 mt-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)} // Toggle visibility on click
            >
              <ShipWheel
                className={`w-full h-full stroke-white stroke-[1.25px] transition-transform duration-500 cursor-pointer ${
                  isOpen ? "rotate-45" : ""
                }`}
              />

              {/* Circular Links */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Link
                  href="/me"
                  className={`absolute text-white text-sm md:text-lg transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: "translate(200%, -150%)" }}
                >
                  <User className="hover:stroke-black hover:bg-white rounded-full  w-8 h-8" />
                </Link>
                <Link
                  href="/projects"
                  className={`absolute text-white text-sm md:text-lg transition-opacity duration-500 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transform: "translate(180%, 120%)" }}
                >
                  <FanIcon className="hover:stroke-black hover:bg-white rounded-full  w-8 h-8" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <hr className=" border-2" />
        <div className=" flex justify-between my-3">
          <span className=" text-lg md:text-3xl  text-white italic">
            {" "}
            &nbsp;FullStack
          </span>
          <ArrowRight />
          <span className=" text-lg md:text-3xl  text-white italic">
            {" "}
            &nbsp;DevOps
          </span>
        </div>
        <p className=" absolute text-white">
          As engineers, we don’t say no—we find a way to make it happen.
        </p>
      </div>
    </div>
  );
}
