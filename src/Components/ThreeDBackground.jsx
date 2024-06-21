import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Floating spheres
    const createSphere = (radius, detail, texture) => {
      const geometry = new THREE.SphereGeometry(radius, detail, detail);
      const material = new THREE.MeshStandardMaterial({
        map: new THREE.TextureLoader().load(texture),
        emissive: 0x072534,
        side: THREE.DoubleSide,
      });
      return new THREE.Mesh(geometry, material);
    };

    const spheres = [
      createSphere(2, 32, 'https://i.pinimg.com/originals/6c/99/5a/6c995a6c01710eaeedde53533f389711.jpg'),
      createSphere(1.5, 32, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-zzq4q1ororKLaFDPII1QHi3AP88KeKnA0g&usqp=CAU'),
      createSphere(1.8, 32, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSP95RYlXouEY_1IcjhsLniupeglMgXb3jA&usqp=CAU'),
      createSphere(2.2, 32, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGq8Rge2zApT9qYjPom8LiuWAVau9kfl5qyg&usqp=CAU'),
      createSphere(1.2, 32, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxsWrlM9RK8E-2M7M1LdpHq-2AyHZPrjmEKw&usqp=CAU'),
      createSphere(2.5, 32, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbdLSsvDFkogPYWqoGuRonAISYWlcHKngkfg&usqp=CAU')
    ];

    spheres.forEach((sphere, index) => {
      sphere.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      scene.add(sphere);
    });

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      spheres.forEach((sphere, index) => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        sphere.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        sphere.scale.x = 1 + Math.sin(Date.now() * 0.001 + index) * 0.05;
        sphere.scale.y = 1 + Math.sin(Date.now() * 0.001 + index) * 0.05;
        sphere.scale.z = 1 + Math.sin(Date.now() * 0.001 + index) * 0.05;
        sphere.material.emissiveIntensity = Math.sin(Date.now() * 0.001 + index) * 0.5 + 0.5;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default ThreeDBackground;
