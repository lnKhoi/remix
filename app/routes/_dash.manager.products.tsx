import {
  useMemo,
  useState,
} from 'react';

import placeholder from '~/assets/placeholder.svg';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';

export default function ProductManagment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const products = [
    {
      id: 1,
      title: "Cozy Sweater",
      image: "/placeholder.svg",
      price: 49.99,
    },
    {
      id: 2,
      title: "Leather Backpack",
      image: "/placeholder.svg",
      price: 79.99,
    },
    {
      id: 3,
      title: "Floral Dress",
      image: "/placeholder.svg",
      price: 59.99,
    },
    {
      id: 4,
      title: "Hiking Boots",
      image: "/placeholder.svg",
      price: 99.99,
    },
    {
      id: 5,
      title: "Ceramic Mug",
      image: "/placeholder.svg",
      price: 14.99,
    },
    {
      id: 6,
      title: "Bamboo Sunglasses",
      image: "/placeholder.svg",
      price: 29.99,
    },
  ];
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  const handleProductSelect = (product:any) => {
    // @ts-ignore
    if (selectedProducts.some((p) => p.id === product.id)) {
    // @ts-ignore

      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
          // @ts-ignore

      setSelectedProducts([...selectedProducts, product]);
    }
  };
  const handleImport = () => {
    console.log("Importing selected products:", selectedProducts);
  };
  return (
    <div className="flex flex-col h-screen">
      <Card>
        <header className="bg-muted/40 py-4 px-6">
          <h1 className="text-2xl font-bold">Import Products from Shopify</h1>
        </header>
        <div className="flex-1 overflow-auto">
          <div className="max-w-4xl mx-auto py-8 px-4 md:px-6">
            <div className="mb-6">
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-md max-w-96 bg-background px-4 py-2 text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-background rounded-md shadow-sm overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={placeholder}
                      alt={product.title}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover"
                      style={{ aspectRatio: "300/300", objectFit: "cover" }}
                    />
                    <button
                      className={`absolute top-2 right-2 bg-background rounded-full p-2 transition-colors ${
                        selectedProducts.some((p:any) => p.id === product.id)
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                      onClick={() => handleProductSelect(product)}
                    >
                      <PackagePlusIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {selectedProducts.length > 0 && (
          <div className="bg-muted py-4 px-6">
            <div className="max-w-4xl mx-auto flex justify-between items-center">
              <div>
                <h2 className="text-lg font-medium mb-2">Selected Products</h2>
                <ul className="space-y-2">
                  {selectedProducts.map((product:any) => (
                    <li key={product.id} className="flex items-center gap-2">
                      <img
                        src={placeholder}
                        alt={product.title}
                        width={40}
                        height={40}
                        className="rounded-md"
                        style={{ aspectRatio: "40/40", objectFit: "cover" }}
                      />
                      <span className="font-medium">{product.title}</span>
                      <span className="text-muted-foreground">
                        ${product.price.toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button onClick={handleImport} className="shrink-0">
                Import Selected
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function PackagePlusIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 16h6" />
      <path d="M19 13v6" />
      <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
      <path d="m7.5 4.27 9 5.15" />
      <polyline points="3.29 7 12 12 20.71 7" />
      <line x1="12" x2="12" y1="22" y2="12" />
    </svg>
  );
}


