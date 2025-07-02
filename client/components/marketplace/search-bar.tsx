import { useState } from "react";
import { Search, Scan } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleVinScan = () => {
    toast({
      title: "VIN Scanner Activated",
      description: "Point your camera at the VIN barcode or dashboard",
      duration: 3000,
    });
    // Simulate VIN detection after 2 seconds
    setTimeout(() => {
      toast({
        title: "VIN Detected!",
        description: "1HGBH41JXMN109186 - 2021 Honda Accord",
        duration: 4000,
      });
    }, 2000);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/parts?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            type="text"
            placeholder="Search by part name, number, or vehicle..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 py-6 text-lg border-2 focus:ring-2 focus:ring-primary/20 bg-background/60 backdrop-blur-sm"
          />
        </div>
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={handleVinScan}
          className="px-6 py-6 border-2 hover:bg-accent hover:text-accent-foreground bg-background/60 backdrop-blur-sm"
        >
          <Scan className="h-5 w-5 mr-2" />
          Scan VIN
        </Button>
        <Button
          type="submit"
          size="lg"
          className="px-8 py-6 bg-primary hover:bg-primary/90"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
