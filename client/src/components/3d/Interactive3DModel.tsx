import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/hooks/use-theme';

interface Interactive3DModelProps {
  modelType: 'cube' | 'sphere' | 'torus' | 'brain';
  size?: number;
  color?: string;
}

export default function Interactive3DModel({ 
  modelType = 'cube', 
  size = 3,
  color
}: Interactive3DModelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Setup the scene
    const scene = new THREE.Scene();
    scene.background = null; // Transparent background
    
    // Setup the camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Setup renderer with transparency
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);
    
    // Dynamic color based on theme
    const modelColor = color || (theme === 'dark' ? '#4361ee' : '#3a0ca3');
    
    // Create the appropriate geometry based on modelType
    let geometry;
    switch(modelType) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(size, 32, 32);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(size, size/3, 16, 100);
        break;
      case 'brain':
        // For brain, create a complex shape using icosahedron with subdivision
        geometry = new THREE.IcosahedronGeometry(size, 2);
        break;
      case 'cube':
      default:
        geometry = new THREE.BoxGeometry(size, size, size);
        break;
    }
    
    // Create material with wireframe for tech look
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: modelColor,
      wireframe: true,
    });
    
    // Create a base material 
    const material = new THREE.MeshStandardMaterial({
      color: modelColor,
      transparent: true,
      opacity: 0.3,
      roughness: 0.4,
      metalness: 0.5,
    });
    
    // Create two meshes - one for wireframe and one for solid
    const solidMesh = new THREE.Mesh(geometry, material);
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    
    // Add both meshes to create the effect
    scene.add(solidMesh);
    scene.add(wireframeMesh);
    
    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add point lights for more depth
    const pointLight1 = new THREE.PointLight(0x4361ee, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x3a0ca3, 1, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    // Variables to track mouse/touch position
    let isInteracting = false;
    let prevX = 0;
    let prevY = 0;
    
    // Rotation speed
    const baseRotationSpeed = 0.001;
    let rotationXSpeed = baseRotationSpeed;
    let rotationYSpeed = baseRotationSpeed;
    
    // Event handlers for mouse/touch interaction
    const handleInteractionStart = (clientX: number, clientY: number) => {
      isInteracting = true;
      prevX = clientX;
      prevY = clientY;
    };
    
    const handleInteractionMove = (clientX: number, clientY: number) => {
      if (!isInteracting) return;
      
      const deltaX = clientX - prevX;
      const deltaY = clientY - prevY;
      
      solidMesh.rotation.y += deltaX * 0.01;
      solidMesh.rotation.x += deltaY * 0.01;
      wireframeMesh.rotation.y += deltaX * 0.01;
      wireframeMesh.rotation.x += deltaY * 0.01;
      
      prevX = clientX;
      prevY = clientY;
    };
    
    const handleInteractionEnd = () => {
      isInteracting = false;
    };
    
    // Mouse event listeners
    container.addEventListener('mousedown', (e) => handleInteractionStart(e.clientX, e.clientY));
    window.addEventListener('mousemove', (e) => handleInteractionMove(e.clientX, e.clientY));
    window.addEventListener('mouseup', handleInteractionEnd);
    
    // Touch event listeners for mobile
    container.addEventListener('touchstart', (e) => {
      e.preventDefault();
      handleInteractionStart(e.touches[0].clientX, e.touches[0].clientY);
    });
    
    window.addEventListener('touchmove', (e) => {
      if (isInteracting) {
        e.preventDefault();
        handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    });
    
    window.addEventListener('touchend', handleInteractionEnd);
    
    // Handle window resize
    const handleResize = () => {
      if (!container) return;
      
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Auto-rotation when not interacting
      if (!isInteracting) {
        solidMesh.rotation.y += rotationXSpeed;
        solidMesh.rotation.x += rotationYSpeed;
        wireframeMesh.rotation.y += rotationXSpeed;
        wireframeMesh.rotation.x += rotationYSpeed;
      }
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', (e) => handleInteractionMove(e.clientX, e.clientY));
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchmove', (e) => {
        if (isInteracting) {
          e.preventDefault();
          handleInteractionMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      });
      window.removeEventListener('touchend', handleInteractionEnd);
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      geometry.dispose();
      material.dispose();
      wireframeMaterial.dispose();
    };
  }, [modelType, size, color, theme]);
  
  return (
    <div 
      ref={containerRef}
      className="w-full h-full min-h-[300px]"
      aria-label={`Interactive 3D ${modelType} model`}
    ></div>
  );
}