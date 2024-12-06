import React, { useState, useEffect, useContext, useCallback, createContext } from 'react';
import { CoinList } from './components/config/Api';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './Firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", type: "success" });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      console.log("Setting up Firestore listener for:", user?.uid);
  
      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          console.log("Firestore data:", coin.data());
          console.log("Coins array:", coin.data().coins);
          setWatchlist(coin.data().coins);
        } else {
          console.log("No watchlist found for user:", user?.uid);
          setWatchlist([]);
        }
      });
  
      return () => {
        console.log("Cleaning up Firestore listener for:", user?.uid);
        unsubscribe();
      };
    }
  }, [user]);
  
//
  const fetchCoins = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(CoinList(currency));
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setAlert({ open: true, message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
    fetchCoins();
  }, [currency, fetchCoins]);

  return (
    <Crypto.Provider value={{ user, currency, symbol, watchlist, setCurrency, coins, loading, fetchCoins, alert, setAlert }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
