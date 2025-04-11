export interface RegionMap {
    [state: string]: string[];
  }
  
  export async function fetchRegionMap(): Promise<RegionMap> {
    const res = await fetch('http://localhost:5000/regions');
    if (!res.ok) {
      throw new Error('Failed to fetch region map');
    }
    return await res.json();
  }  