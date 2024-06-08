"use client";
import Image from "next/image";
import React, { useState } from "react";
export default function Home() {
  const [money, setMoney] = React.useState<number>(500);
  const initialColors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33A1",
    "#33FFF6",
    "#F633FF",
    "#FF8633",
  ];
  const [colors, setColors] = useState<string[]>(initialColors);
  const [draggedColorIndex, setDraggedColorIndex] = useState(-1);

  const handleIncrement = () => {
    setMoney((prev) => prev + 1000);
  };

  const handleDecrement = () => {
    if (money < 500) return alert("You don't have enough money");
    setMoney((prev) => prev - 500);
  };

  const handleDragStart = (index: number) => {
    setDraggedColorIndex(index);
  };

  const handleDragOver = (index: number) => {
    const draggedOverColorIndex = index;
    if (draggedColorIndex === draggedOverColorIndex) {
      return;
    }
    const newColors = [...colors];
    const [draggedColor] = newColors.splice(draggedColorIndex, 1);
    newColors.splice(draggedOverColorIndex, 0, draggedColor);
    setDraggedColorIndex(draggedOverColorIndex);
    setColors(newColors);
  };

  const handleColorChange = (index: number, newColor: string) => {
    const updatedColors = colors.map((color, i) =>
      i === index ? newColor : color
    );
    setColors(updatedColors);
  };

  return (
    <div className="h-screen flex items-center flex-col bg-white gap-2 text-black">
      <div className="p-3">
        <h2>Q1.</h2>
        <p className="text-center p-3">Your Money: {money}</p>
        <div className="flex justify-center gap-10">
          <button
            onClick={handleIncrement}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Increment
          </button>
          <button
            onClick={handleDecrement}
            className="bg-red-500 text-white px-4 py-2 rounded-lg">
            decrement
          </button>
        </div>
      </div>

      <div className="flex gap-10">
        <h2>Q2.</h2>
        {colors.map((color, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={() => handleDragOver(index)}
            style={{ backgroundColor: color }}>
              
            <input
              type="color"
              value={color}
              onChange={(e) => handleColorChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
