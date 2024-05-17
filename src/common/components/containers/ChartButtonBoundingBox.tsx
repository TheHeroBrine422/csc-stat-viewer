import React from "react";

export function ChartButtonBoundingBox({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return <div className="flex space-x-4 mb-3">{children}</div>;
  }