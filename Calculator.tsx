
import React, { useState, useCallback } from 'react';
import Display from './Display';
import Button from './Button';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(true);

  const formatNumber = (numStr: string) => {
    if (numStr.includes('Infinity') || numStr.includes('NaN')) {
      return 'Error';
    }
    const [integerPart, decimalPart] = numStr.split('.');
    
    // Don't format if it's just a negative sign
    if(integerPart === '-') return '-';
    if(integerPart === '') return `.${decimalPart || ''}`;
    
    const number = BigInt(integerPart);
    const formattedInteger = new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 0,
    }).format(number);
    
    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
  };
  
  const clearAll = useCallback(() => {
    setDisplayValue('0');
    setOperator(null);
    setPreviousValue(null);
    setWaitingForOperand(true);
  }, []);
  
  const handleClear = useCallback(() => {
    // 'C' logic: Clear current entry
    if (!waitingForOperand && displayValue !== '0') {
      setDisplayValue('0');
    } else { // 'AC' logic: Clear everything
      clearAll();
    }
  }, [displayValue, waitingForOperand, clearAll]);


  const toggleSign = useCallback(() => {
    setDisplayValue(prev => {
      if (prev === '0' || prev === 'Error') return '0';
      const result = String(parseFloat(prev) * -1);
      return result;
    });
  }, []);

  const inputPercent = useCallback(() => {
    setDisplayValue(prev => {
      if(prev === 'Error') return '0';
      const result = String(parseFloat(prev) / 100);
      return result;
    });
    setWaitingForOperand(true);
  }, []);

  const inputDigit = useCallback((digit: string) => {
    if(displayValue.length >= 15 && !waitingForOperand) return;
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(prev => (prev === '0' ? digit : prev + digit));
    }
  }, [displayValue, waitingForOperand]);

  const inputDecimal = useCallback(() => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
    } else if (!displayValue.includes('.')) {
      setDisplayValue(prev => prev + '.');
    }
  }, [displayValue, waitingForOperand]);
  
  const calculate = (firstOperand: number, secondOperand: number, op: string): number => {
    switch (op) {
      case '+': return firstOperand + secondOperand;
      case '-': return firstOperand - secondOperand;
      case '×': return firstOperand * secondOperand;
      case '÷':
        if (secondOperand === 0) return Infinity;
        return firstOperand / secondOperand;
      default: return secondOperand;
    }
  };

  const performOperation = useCallback((nextOperator: string) => {
    if (displayValue === 'Error') {
      clearAll();
      return;
    }
    const inputValue = parseFloat(displayValue);

    if (operator && previousValue !== null && !waitingForOperand) {
        const result = calculate(parseFloat(previousValue), inputValue, operator);
        const resultString = String(result);
        setDisplayValue(resultString);
        setPreviousValue(resultString);
    } else {
        setPreviousValue(displayValue);
    }

    setWaitingForOperand(true);
    if(nextOperator === '='){
        setOperator(null);
        setPreviousValue(null);
    } else {
        setOperator(nextOperator);
    }

  }, [displayValue, operator, previousValue, waitingForOperand, clearAll]);
  
  const displayedString = () => {
    try {
        if(waitingForOperand && previousValue !== null && operator && operator !== '=') {
           return formatNumber(previousValue);
        }
       return formatNumber(displayValue);
    } catch {
       return 'Error';
    }
  };

  return (
    <div className="bg-black p-4 rounded-3xl shadow-2xl shadow-slate-900/70 w-full">
      <Display value={displayedString()} />
      <div className="grid grid-cols-4 gap-3">
        <Button label={(!waitingForOperand && displayValue !== '0') ? 'C' : 'AC'} variant="function" onClick={handleClear} />
        <Button label="±" variant="function" onClick={toggleSign} />
        <Button label="%" variant="function" onClick={inputPercent} />
        <Button label="÷" variant="operator" active={operator === '÷'} onClick={() => performOperation('÷')} />

        <Button label="7" onClick={() => inputDigit('7')} />
        <Button label="8" onClick={() => inputDigit('8')} />
        <Button label="9" onClick={() => inputDigit('9')} />
        <Button label="×" variant="operator" active={operator === '×'} onClick={() => performOperation('×')} />
        
        <Button label="4" onClick={() => inputDigit('4')} />
        <Button label="5" onClick={() => inputDigit('5')} />
        <Button label="6" onClick={() => inputDigit('6')} />
        <Button label="-" variant="operator" active={operator === '-'} onClick={() => performOperation('-')} />

        <Button label="1" onClick={() => inputDigit('1')} />
        <Button label="2" onClick={() => inputDigit('2')} />
        <Button label="3" onClick={() => inputDigit('3')} />
        <Button label="+" variant="operator" active={operator === '+'} onClick={() => performOperation('+')} />

        <Button label="0" className="col-span-2 justify-start pl-8" onClick={() => inputDigit('0')} />
        <Button label="." onClick={inputDecimal} />
        <Button label="=" variant="operator" onClick={() => performOperation('=')} />
      </div>
    </div>
  );
};

export default Calculator;
