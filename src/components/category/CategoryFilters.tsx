
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Check, ChevronDown, Star } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

interface FilterProps {
  onApplyFilters: (filters: any) => void;
}

const CategoryFilters = ({ onApplyFilters }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [openSections, setOpenSections] = useState({
    price: true,
    rating: true,
    material: true,
    artisan: false
  });

  const materials = [
    'Clay', 'Terracotta', 'Wood', 'Bamboo', 'Silk', 'Cotton', 
    'Brass', 'Silver', 'Beads', 'Ceramic', 'Natural Fibers'
  ];

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const handleMaterialToggle = (material: string) => {
    if (selectedMaterials.includes(material)) {
      setSelectedMaterials(selectedMaterials.filter(m => m !== material));
    } else {
      setSelectedMaterials([...selectedMaterials, material]);
    }
  };

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section]
    });
  };

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      ratings: selectedRating,
      materials: selectedMaterials
    });
  };

  const handleReset = () => {
    setPriceRange([0, 10000]);
    setSelectedRating(0);
    setSelectedMaterials([]);
    onApplyFilters({});
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-serif text-hunar-earth">Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Range Filter */}
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('price')}
            >
              <h3 className="font-medium text-hunar-earth">Price Range</h3>
              <ChevronDown 
                size={18} 
                className={`text-hunar-terracotta transition-transform ${openSections.price ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {openSections.price && (
              <div className="space-y-4">
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  step={100}
                  value={priceRange}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-6"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-hunar-earth">
                    ₹{priceRange[0]}
                  </span>
                  <span className="text-sm text-hunar-earth">
                    ₹{priceRange[1]}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('rating')}
            >
              <h3 className="font-medium text-hunar-earth">Rating</h3>
              <ChevronDown 
                size={18} 
                className={`text-hunar-terracotta transition-transform ${openSections.rating ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {openSections.rating && (
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <div 
                    key={rating}
                    className="flex items-center cursor-pointer hover:bg-hunar-sand/30 px-2 py-1 rounded-md"
                    onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                  >
                    <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${selectedRating === rating ? 'border-hunar-terracotta bg-hunar-terracotta/10' : 'border-hunar-earth/30'}`}>
                      {selectedRating === rating && <Check size={12} className="text-hunar-terracotta" />}
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="ml-1 text-sm">& above</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Material Filter */}
          <div className="space-y-4">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('material')}
            >
              <h3 className="font-medium text-hunar-earth">Material</h3>
              <ChevronDown 
                size={18} 
                className={`text-hunar-terracotta transition-transform ${openSections.material ? 'rotate-180' : ''}`} 
              />
            </div>
            
            {openSections.material && (
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {materials.map(material => (
                  <div 
                    key={material}
                    className="flex items-center cursor-pointer hover:bg-hunar-sand/30 px-2 py-1 rounded-md"
                    onClick={() => handleMaterialToggle(material)}
                  >
                    <div className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${selectedMaterials.includes(material) ? 'border-hunar-terracotta bg-hunar-terracotta/10' : 'border-hunar-earth/30'}`}>
                      {selectedMaterials.includes(material) && <Check size={12} className="text-hunar-terracotta" />}
                    </div>
                    <span className="text-sm">{material}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              className="w-1/2 bg-white border-hunar-terracotta text-hunar-terracotta hover:bg-hunar-terracotta hover:text-white"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button 
              className="w-1/2 bg-hunar-terracotta text-white hover:bg-hunar-earth"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoryFilters;
