import { useState, useCallback, DragEvent } from 'react';

interface UseDragDropProps {
  onItemDropped: (item: string) => void;
}

export const useDragDrop = ({ onItemDropped }: UseDragDropProps) => {
  const [draggingItem, setDraggingItem] = useState<string | null>(null);

  const handleDragStart = useCallback((e: DragEvent<HTMLDivElement>, item: string) => {
    e.dataTransfer.setData('text/plain', item);
    setDraggingItem(item);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggingItem(null);
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLElement>) => {
    e.currentTarget.classList.remove('hover');
  }, []);

  const handleDrop = useCallback((e: DragEvent<HTMLElement>, target: HTMLElement | null) => {
    e.preventDefault();
    if (!target) return;
    
    target.classList.remove('hover');
    const droppedItem = e.dataTransfer.getData('text/plain');
    if (!droppedItem) return;
    
    target.classList.add('filled');
    onItemDropped(droppedItem);
    setDraggingItem(null);
  }, [onItemDropped]);

  const resetDragState = useCallback(() => {
    setDraggingItem(null);
  }, []);

  // Touch handlers for mobile support
  const handleTouchStart = useCallback((item: string) => {
    setDraggingItem(item);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent, targets: HTMLElement[]) => {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Find element under the touch position
    const elementUnderTouch = document.elementFromPoint(x, y);
    
    // Reset hover state on all targets
    targets.forEach(target => target.classList.remove('hover'));
    
    // If touching a drop target, add hover class
    if (elementUnderTouch && targets.includes(elementUnderTouch as HTMLElement)) {
      (elementUnderTouch as HTMLElement).classList.add('hover');
    }
  }, []);

  const handleTouchEnd = useCallback((e: TouchEvent, targets: HTMLElement[], onItemDropped: (item: string) => void) => {
    if (!draggingItem) return;
    
    const touch = e.changedTouches[0];
    const x = touch.clientX;
    const y = touch.clientY;
    
    // Find element under the touch position
    const elementUnderTouch = document.elementFromPoint(x, y) as HTMLElement;
    
    // Reset hover state on all targets
    targets.forEach(target => target.classList.remove('hover'));
    
    // If dropped on a target, handle the drop
    if (elementUnderTouch && targets.includes(elementUnderTouch)) {
      elementUnderTouch.classList.add('filled');
      onItemDropped(draggingItem);
    }
    
    setDraggingItem(null);
  }, [draggingItem]);

  return {
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    draggingItem,
    resetDragState
  };
};
