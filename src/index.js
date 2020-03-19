function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let currentNumber = new String();
    let calcArray = new Array();
  
    expr.split('').forEach(el => {  //перевод вычисляемого выражения в массив
      el == ' ' ? {}:
      (el == '*' || el == '/' || el == '+' || el == '-') && currentNumber.length == 0 ? calcArray.push(el): 
      el == '*' || el == '/' || el == '+' || el == '-' ? (calcArray.push(Number(currentNumber), el), currentNumber = new String()): 
      (el == '(' || el == ')') && currentNumber.length == 0 ? calcArray.push(el):
      el == '(' || el == ')'? (calcArray.push(Number(currentNumber), el), currentNumber = new String()) : currentNumber += el;
    });
    
    if(calcArray[calcArray.length-1] !== ')'){ //добавление последнего аргумента в строку
      calcArray.push(Number(currentNumber)); 
    };
  
      calcArray.forEach((el, index, arr) => { //проверка на отрицательное число
      el == "-" && typeof arr[index+1] == 'number' && (arr[index-1] == '*' || arr[index-1] == '/' || arr[index-1] == '+') ? calcArray.splice(index, 2, Number('-' + arr[index+1])):
      el == "-" && typeof arr[index+1] == '-' ? calcArray.splice(index, 2, '+'):{};
    });
  
    while(calcArray.indexOf('(') !== -1 || calcArray.indexOf(')') !== -1){
      if (calcArray.lastIndexOf('(') !== -1){ //раскрытие скобок
        let elementPositionOpen = calcArray.lastIndexOf('(');

        if (calcArray.indexOf(')', elementPositionOpen) !== -1){
         let elementPositionClose = calcArray.indexOf(')', elementPositionOpen);
  
          let expressionInBrackets = calcArray.slice(elementPositionOpen+1, elementPositionClose);
          let calculatingValueExpressionInBrackets = calculatingExpression(expressionInBrackets); //вычисление значения внутри скобок
          calcArray.splice(elementPositionOpen,elementPositionClose-elementPositionOpen+1, calculatingValueExpressionInBrackets)
        }
        else {
          throw new Error ('ExpressionError: Brackets must be paired') //ошибка, если отсутствует пара у открывающей скобки
        };
      }
      else { //ошибка, если отсутствует пара у закрывающей скобки
        throw new Error ('ExpressionError: Brackets must be paired')
      };
    };
    
    let calculetedValue = calculatingExpression(calcArray);
    return Number.isInteger(Number(calculetedValue)) ? Number(calculetedValue) : Number(Number(calculetedValue).toFixed(4))
  };
  
  function calculatingExpression (calcArray){ //вычисление переданного значения
   
    while(calcArray.includes('*') || calcArray.includes('/')){ //проведение операций * и /
  
      if (calcArray.indexOf('*') > 0 && calcArray.indexOf('*') < calcArray.indexOf('/') || calcArray.indexOf('/') == -1){
        let secondArgument = calcArray.splice(calcArray.indexOf('*')+1,1);
        let firstArgument = calcArray.splice(calcArray.indexOf('*')-1,1);
  
        calcArray.splice(calcArray.indexOf('*'),1,firstArgument*secondArgument)
      }
      else if (calcArray.indexOf('/') > 0 && calcArray.indexOf('*') > calcArray.indexOf('/') || calcArray.indexOf('*') == -1){
        let secondArgument = calcArray.splice(calcArray.indexOf('/')+1,1);
        if (secondArgument == 0){
            throw new Error ('TypeError: Division by zero.')
        };
        let firstArgument = calcArray.splice(calcArray.indexOf('/')-1,1);
  
        calcArray.splice(calcArray.indexOf('/'),1,firstArgument/secondArgument)
      };
    };
  
    while(calcArray.includes('+') || calcArray.includes('-')){ // проведение операций + и -
  
      if (calcArray.indexOf('+') > 0 && calcArray.indexOf('+') < calcArray.indexOf('-') || calcArray.indexOf('-') == -1 ){
        let secondArgument = calcArray.splice(calcArray.indexOf('+')+1,1);
        let firstArgument = calcArray.splice(calcArray.indexOf('+')-1,1);
  
        calcArray.splice(calcArray.indexOf('+'),1,Number(firstArgument)+Number(secondArgument))
      }
      else if (calcArray.indexOf('-') > 0 && calcArray.indexOf('+') > calcArray.indexOf('-') || calcArray.indexOf('+') == -1){
        let secondArgument = calcArray.splice(calcArray.indexOf('-')+1,1);
        let firstArgument = calcArray.splice(calcArray.indexOf('-')-1,1);
  
        calcArray.splice(calcArray.indexOf('-'),1,firstArgument-secondArgument)
      };
    };
  
    return Number(calcArray)
  };

module.exports = {
    expressionCalculator
}