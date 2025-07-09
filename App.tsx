import React from 'react';
import { MoneyCounter } from './components/MoneyCounter';
import { ItemCard } from './components/ItemCard';
import { Receipt } from './components/Receipt';
import { useSpending } from './hooks/useSpending';
import { items } from './data/items';
import { SoundEffects } from './utils/soundEffects';

function App() {
  const {
    remainingMoney,
    totalSpent,
    initialMoney,
    purchases,
    buyItem,
    sellItem,
    getItemQuantity,
    canAffordItem
  } = useSpending();

  // Initialize audio context on first user interaction
  React.useEffect(() => {
    const initAudio = () => {
      // This will initialize the audio context
      SoundEffects.playHover();
      document.removeEventListener('click', initAudio);
    };
    
    document.addEventListener('click', initAudio);
    return () => document.removeEventListener('click', initAudio);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <MoneyCounter 
        remainingMoney={remainingMoney}
        totalSpent={totalSpent}
        initialMoney={initialMoney}
      />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Spend Like a Billionaire
          </h2>
          <p className="text-gray-600 text-lg">
            You have $200 billion to spend. What will you buy?
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  quantity={getItemQuantity(item.id)}
                  canAfford={canAffordItem(item)}
                  onBuy={() => buyItem(item)}
                  onSell={() => sellItem(item)}
                />
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <Receipt purchases={purchases} totalSpent={totalSpent} />
          </div>
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600">
            This simulator helps visualize the scale of extreme wealth. 
            <br />
            All values are approximations and for educational purposes.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;