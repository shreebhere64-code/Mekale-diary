'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase'; // Ensure this file exists in your lib folder

// --- Components ---

const Navbar = () => (
  <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center bg-white/40 backdrop-blur-xl border-b border-white/20">
    <div className="text-2xl font-serif font-bold tracking-tighter text-slate-800">
      Mekale<span className="text-sky-400">.</span>
    </div>
    <div className="hidden md:flex gap-10 text-xs uppercase tracking-widest font-light text-slate-600">
      <a href="#products" className="hover:text-sky-400 transition-colors">Products</a>
      <a href="#" className="hover:text-sky-400 transition-colors">Our Farm</a>
      <a href="#" className="hover:text-sky-400 transition-colors">Story</a>
    </div>
    <button className="bg-sky-500 text-white text-[10px] uppercase tracking-[0.2em] px-8 py-3 rounded-full hover:bg-sky-600 transition-all shadow-lg shadow-sky-200">
      Order Now
    </button>
  </nav>
);

const ProductCard = ({ name, price, tag, desc }: { name: string, price: string, tag: string, desc: string }) => {
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('orders')
      .insert([{ product_name: name, price: price }]);
    
    setLoading(false);
    if (!error) alert(`${name} added to your farm-fresh basket!`);
    else alert("Connection error. Please try again.");
  };

  return (
    <motion.div 
      whileHover={{ y: -15 }}
      className="bg-white/60 backdrop-blur-2xl border border-white/80 p-8 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-sky-100 transition-all group"
    >
      <div className="h-40 w-full bg-gradient-to-br from-sky-50 to-cream-50 rounded-2xl mb-6 flex items-center justify-center overflow-hidden">
         {/* Placeholder for 3D Product Asset */}
         <div className="text-sky-200 font-serif italic text-4xl group-hover:scale-110 transition-transform duration-500">{name[0]}</div>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-sky-500 font-bold">{tag}</span>
      <h3 className="text-2xl font-serif text-slate-800 mt-2">{name}</h3>
      <p className="text-slate-500 text-sm font-light mt-3 leading-relaxed">{desc}</p>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-xl font-serif text-sky-600">{price}</span>
        <button 
          onClick={handleOrder}
          disabled={loading}
          className="text-[10px] uppercase tracking-tighter border-b border-sky-400 pb-1 hover:text-sky-400 transition-colors"
        >
          {loading ? 'Processing...' : 'Add to Delivery +'}
        </button>
      </div>
    </motion.div>
  );
};

// --- Main Page ---

export default function MekaleFrontend() {
  return (
    <div className="min-h-screen bg-[#F7FBFE] selection:bg-sky-100 selection:text-sky-600">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-10 lg:px-24 overflow-hidden">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-200/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-cream/40 blur-[100px] rounded-full" />

        <div className="grid lg:grid-cols-2 gap-10 items-center z-10 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl lg:text-8xl font-serif leading-[1.1] text-slate-900">
              Pure. <br />
              <i className="text-sky-400 font-light">Natural.</i> <br />
              Premium.
            </h1>
            <p className="mt-8 text-slate-500 max-w-md font-light leading-relaxed">
              Mekale brings you the finest dairy, hand-selected from our pasture-fed herds. No preservatives, just pure farm-to-table excellence.
            </p>
            <div className="mt-12 flex gap-6">
              <button className="bg-slate-900 text-white px-10 py-5 rounded-full text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                Explore Collection
              </button>
              <button className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-slate-700 group">
                <span className="w-10 h-[1px] bg-slate-300 group-hover:w-14 transition-all" /> Our Process
              </button>
            </div>
          </motion.div>

          {/* Hero 3D Illustration Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="relative flex justify-center"
          >
            <div className="w-[450px] h-[600px] bg-white/30 backdrop-blur-md rounded-[3rem] border border-white/50 relative overflow-hidden flex items-center justify-center">
              {/* Replace with your <Spline /> component or 3D SVG