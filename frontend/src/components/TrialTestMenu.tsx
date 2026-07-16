"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { ChevronDown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
}

export default function TrialTestMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchProjects = async () => {
    if (projects.length > 0) return; // Already fetched
    setIsLoading(true);
    try {
      const res = await fetchApi('/public/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      fetchProjects();
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <Button 
        onClick={toggleMenu} 
        className="rounded-full px-6 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 font-medium transition-all gap-2"
      >
        Start Test
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg shadow-slate-200 border border-slate-100 p-2 z-50">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50 mb-2">
            Pilih Survei
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            </div>
          ) : projects.length === 0 ? (
            <div className="p-4 text-sm text-slate-500 text-center font-medium">
              Belum ada survei aktif.
            </div>
          ) : (
            <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
              {projects.map((p) => (
                <Link 
                  key={p.id} 
                  href={`/survey/${p.id}`} 
                  className="px-3 py-2.5 rounded-lg hover:bg-blue-50 transition-colors text-sm text-slate-700 font-medium block"
                >
                  <div className="line-clamp-1">{p.title}</div>
                  {p.description && (
                     <div className="text-[10px] text-slate-400 font-normal line-clamp-1 mt-0.5">{p.description}</div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
