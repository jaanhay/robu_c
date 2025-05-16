import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const products = [
    // Controllers
    {
      name: 'Arduino Uno R3',
      image: 'https://m.media-amazon.com/images/I/61FJhM8R5HL._AC_SL1000_.jpg',
      price: 799,
      description: 'A microcontroller board based on the ATmega328P. Ideal for beginners and prototyping.',
      category: 'controllers',
      countInStock: 20,
    },
    {
      name: 'Raspberry Pi 4 Model B',
      image: 'https://m.media-amazon.com/images/I/71DZF+waQbL._AC_SL1500_.jpg',
      price: 4999,
      description: 'A powerful SBC with 4GB RAM, dual display support, and gigabit ethernet. Great for IoT and projects.',
      category: 'controllers',
      countInStock: 15,
    },
    {
      name: 'ESP32 Dev Board',
      image: 'https://m.media-amazon.com/images/I/61OSaJfA4tL._AC_SL1500_.jpg',
      price: 299,
      description: 'A WiFi + Bluetooth enabled microcontroller. Perfect for smart home and wireless projects.',
      category: 'controllers',
      countInStock: 30,
    },
    {
      name: 'STM32F103C8T6 Board',
      image: 'https://m.media-amazon.com/images/I/71sMnTBu5NL._AC_SL1500_.jpg',
      price: 349,
      description: 'ARM Cortex-M3 based development board, used in embedded systems and robotics.',
      category: 'controllers',
      countInStock: 10,
    },
  
    // Batteries
    {
      name: 'Li-ion 18650 Battery - 3.7V 2600mAh',
      image: 'https://m.media-amazon.com/images/I/71fVzAJHYhL._AC_SL1500_.jpg',
      price: 199,
      description: 'High capacity rechargeable battery for robotics and electronics.',
      category: 'batteries',
      countInStock: 50,
    },
    {
      name: '9V Battery - Heavy Duty',
      image: 'https://m.media-amazon.com/images/I/61SgOaQwG0L._AC_SL1000_.jpg',
      price: 49,
      description: 'Classic 9V battery used for Arduino, smoke detectors, and remotes.',
      category: 'batteries',
      countInStock: 100,
    },
    {
      name: 'Battery Holder - 2xAA',
      image: 'https://m.media-amazon.com/images/I/41azwGB3KxL._AC_.jpg',
      price: 29,
      description: 'Battery holder for 2 AA cells with leads. Used in small DIY projects.',
      category: 'batteries',
      countInStock: 75,
    },
    {
      name: 'Li-Po Battery 3.7V 1000mAh',
      image: 'https://m.media-amazon.com/images/I/71JG2fTlmYL._AC_SL1500_.jpg',
      price: 149,
      description: 'Compact lithium polymer battery, ideal for drones and wearables.',
      category: 'batteries',
      countInStock: 40,
    },
  
    // Electronic Components
    {
      name: 'Resistor Kit 1/4W (600 pcs)',
      image: 'https://m.media-amazon.com/images/I/71Nz9vYGIEL._AC_SL1500_.jpg',
      price: 129,
      description: 'Assorted resistors ranging from 1Ω to 1MΩ. Must-have for circuit building.',
      category: 'electronic components',
      countInStock: 60,
    },
    {
      name: 'Capacitor Kit 50V (250 pcs)',
      image: 'https://m.media-amazon.com/images/I/91dLJIp5x0L._AC_SL1500_.jpg',
      price: 149,
      description: 'Electrolytic capacitors of various values for DIY electronics.',
      category: 'electronic components',
      countInStock: 40,
    },
    {
      name: 'Transistor Pack (NPN/PNP)',
      image: 'https://m.media-amazon.com/images/I/81IN2XnPusL._AC_SL1500_.jpg',
      price: 99,
      description: 'Set of basic transistors including BC547, BC557, 2N2222, and others.',
      category: 'electronic components',
      countInStock: 50,
    },
    {
      name: 'Breadboard 830 Points',
      image: 'https://m.media-amazon.com/images/I/61GeE1fyhDL._AC_SL1001_.jpg',
      price: 89,
      description: 'Re-usable breadboard for circuit prototyping without soldering.',
      category: 'electronic components',
      countInStock: 80,
    },
  
    // Motors
    {
      name: 'BO Motor - Straight',
      image: 'https://m.media-amazon.com/images/I/61BGMu5ctZL._AC_SL1200_.jpg',
      price: 59,
      description: 'Basic DC motor used in small robots. Low RPM with good torque.',
      category: 'motors',
      countInStock: 100,
    },
    {
      name: 'Servo Motor - SG90',
      image: 'https://m.media-amazon.com/images/I/61V8pD8dP5L._AC_SL1000_.jpg',
      price: 99,
      description: 'Mini servo motor ideal for robotic arms and rotation control.',
      category: 'motors',
      countInStock: 40,
    },
    {
      name: 'Stepper Motor 28BYJ-48',
      image: 'https://m.media-amazon.com/images/I/61ftK-03HLL._AC_SL1500_.jpg',
      price: 129,
      description: 'Unipolar stepper motor used for precise rotation control in automation.',
      category: 'motors',
      countInStock: 35,
    },
    {
      name: 'Geared DC Motor 12V',
      image: 'https://m.media-amazon.com/images/I/71IfL6YmZtL._AC_SL1500_.jpg',
      price: 299,
      description: 'High torque 12V motor used in chassis and robotic applications.',
      category: 'motors',
      countInStock: 20,
    },
  ];
const importData = async () => {
    try {
      await Product.deleteMany();
      await Product.insertMany(products);
      console.log('✅ Data Imported!');
      process.exit();
    } catch (err) {
      console.error('❌ Error importing data:', err);
      process.exit(1);
    }
  };
  
  importData();
