function SPIM() {

    // Переменные считанные с панели ввода

    let Epsilon = document.getElementById("Epsilon").value;
    Epsilon = parseFloat(Epsilon).toFixed(28);     // Максимальная допустимая погрешность Tolerance
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let c = parseFloat(document.getElementById("c").value);
    let Max = document.getElementById("Max").value;
    let fx = document.getElementById("dropdownMenuButton").value;
    let t_max = document.getElementById("t_max").value;

    try {       // Проверка на корректность искомой функции
        solve(a, fx);
    } catch(err) {
        alert('Функция f(x) не имеет математического смысла');
        document.getElementById("OutputText").value ="Функция f(x) не имеет математического смысла.";
        document.getElementById("OutputText").style.color = 'red';
        return 0;
    }
    
    // Промежуточные переменные и переменные для вывода
    let x0;
    let fx0;    
    let fa = solve(a, fx);
    let fb = solve(b, fx);
    let fc = solve(c, fx);
    let iterations = 0;
    let arr_x = []; 
    let results = [];       // Результат выполения поитерационно
    var time = 0;               // Подсчет времени

    if(fx.match(/x/) == "x"){   // Верификация №1
        if(fx.match(/y/) == "y"){
            alert("Функция должна иметь только одну переменную");
            document.getElementById("OutputText").value ="Функция должна иметь только одну переменную.";
            document.getElementById("OutputText").style.color = 'red';
            return 0;
        }
    }

    if(Max<=0){       //Проверка положительности кол-во итераций
        alert("Кол-во итераций должно быть больше нуля");
        document.getElementById("OutputText").value ="Кол-во итераций должно быть больше нуля.";
        document.getElementById("OutputText").style.color = 'red';
        return 0;
    }

    if(a == b || b == c || a == c){
        alert("Введите разные значения для точек a, b, c");
        document.getElementById("OutputText").value ="Введите разные значения для точек a, b, c";
        document.getElementById("OutputText").style.color = 'red';
        return 0;
    }

    var radio_btn = document.getElementsByName('criterion'); // Обработка радио кнопки(максимум, минимум)
        for(i = 0; i < radio_btn.length; i++) { 
            if(radio_btn[i].checked){
                if(radio_btn[i].value == "minimum"){    // Если критерий был выбран на поиск минимума
                        time = performance.now();   // начинается подсчет времени выполнения алгоритма
                        while(iterations<Max){  
                            iterations++;
                            x0 = b - ((fb-fc)*(b-a)^2-(fb-fa)*(b-c)^2)/(2*((fb-fc)*(b-a)-(fb-fa)*(b-c)));
                            fx0 = solve(x0, fx);
                            if(x0>b){
                                if(fx0>fb){
                                    c = x0;
                                    fc = fx0;
                                }
                                else{
                                    a = b;
                                    fa = fb;
                                    b = x0;
                                    fb = fx0;
                                }
                            }
                            else{
                                if(fx0>fb){
                                    a = x0;
                                    fa = fx0;
                                }
                                else{
                                    c = b;
                                    fc = fb;
                                    b = x0;
                                    fb = fx0;
                                }
                            }
                            arr_x.push(x0);
                            let result = {
                                    n: iterations,
                                    x0: x0,
                                    Epsilon: Epsilon,
                                    fx0: fx0
                                }
                            results.push(result);
                        }
                        time = performance.now() - time; // окончание подсчета времени
                        if(time>t_max){      // Верификация №2
                            if(confirm("Решение не найдено за заданное кол-во времени, хотите увеличить время в двое и продолжить поиск корня?")){
                                t_max = t_max*2;
                                document.getElementById("t_max").value = t_max;
                                SPIM();
                            }
                            else{
                                document.getElementById("OutputText").value ="Решение не найдено с заданной точностью "+document.getElementById("Epsilon").value+" за заданное кол-во времени.";
                                document.getElementById("OutputText").style.color = 'red';
                                return 0;
                            }
                        }
                        else{
                            if(Math.abs(math.eval((arr_x[arr_x.length-1])-(arr_x[arr_x.length-2])))<Epsilon){
                            document.getElementById("OutputText").value ="Решение найдено для минимума функции: "+fx+"\n"+"Данное решения является валидным т.к выполняется условие ABS(x1-x0)<Tolerance:"+"\n"+Math.abs(math.eval((arr_x[arr_x.length-1])-(arr_x[arr_x.length-2]))).toFixed(28)+"<"+Epsilon+". Затрачено "+time.toFixed(3)+" миллисекунд";
                            document.getElementById("OutputText").style.color = '#03a30e'; 
                            }
                            else{
                            document.getElementById("OutputText").value ="Решение не найдено с заданной точностью за заданное кол-во итераций";
                            document.getElementById("OutputText").style.color = 'red';
                            }
                        }
                }
                else{               // Если критерий был выбран на поиск максимума
                        time = performance.now();   // начинается подсчет времени выполнения алгоритма
                        while(iterations<Max){  
                            iterations++;
                            x0 = b - ((fb-fc)*(b-a)^2-(fb-fa)*(b-c)^2)/(2*((fb-fc)*(b-a)-(fb-fa)*(b-c)));
                            fx0 = solve(x0, fx);
                            if(x0>b){
                                if(fx0<fb){
                                    c = x0;
                                    fc = fx0;
                                }
                                else{
                                    a = b;
                                    fa = fb;
                                    b = x0;
                                    fb = fx0;
                                }
                            }
                            else{
                                if(fx0<fb){
                                    a = x0;
                                    fa = fx0;
                                }
                                else{
                                    c = b;
                                    fc = fb;
                                    b = x0;
                                    fb = fx0;
                                }
                            }
                            arr_x.push(x0);
                            let result = {
                                    n: iterations,
                                    x0: x0,
                                    Epsilon: Epsilon,
                                    fx0: fx0
                                }
                            results.push(result);
                        }
                        time = performance.now() - time; // окончание подсчета времени
                        if(time>t_max){      // Верификация №2
                            if(confirm("Решение не найдено за заданное кол-во времени, хотите увеличить время в двое и продолжить поиск корня?")){
                                t_max = t_max*2;
                                document.getElementById("t_max").value = t_max;
                                SPIM();
                            }
                            else{
                                document.getElementById("OutputText").value ="Решение не найдено с заданной точностью "+document.getElementById("Epsilon").value+" за заданное кол-во времени.";
                                document.getElementById("OutputText").style.color = 'red';
                                return 0;
                            }
                        }
                        else{
                            if(Math.abs(math.eval((arr_x[arr_x.length-1])-(arr_x[arr_x.length-2])))<Epsilon){
                            document.getElementById("OutputText").value ="Решение найдено для максимума функции: "+fx+"\n"+"Данное решения является валидным т.к выполняется условие ABS(x1-x0)<Tolerance:"+"\n"+Math.abs(math.eval((arr_x[arr_x.length-1])-(arr_x[arr_x.length-2]))).toFixed(28)+"<"+Epsilon+". Затрачено "+time.toFixed(3)+" миллисекунд";
                            document.getElementById("OutputText").style.color = '#03a30e'; 
                            }
                            else{
                            document.getElementById("OutputText").value ="Решение не найдено с заданной точностью за заданное кол-во итераций";
                            document.getElementById("OutputText").style.color = 'red';
                            }
                        }
                    } 
            } 
        }


    var i = 0;              
    if (i == 0) {       //Прогресса выполения(Progress Bar)
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }

    document.getElementById("absTol").value = Math.abs(math.eval((arr_x[arr_x.length-1])-(arr_x[arr_x.length-2])));
    document.getElementById("x1").value = x0;
    document.getElementById("yf1").value = fx0;
    document.getElementById("timeWaste").value = time;
    drawTable(results);         // Вывод данных на таблицу
    drawGraph(fx);

}   

function solve(value, equation) {
    return math.eval(equation.replace(/[xyXY]+/g, value));
}

function drawTable(results) {
    let table = document.getElementById("myTable");
    table.innerHTML = "";
    let row;

    results.reverse();
    results.filter(function(result) {
        row = table.insertRow(0);
        row.insertCell(0).appendChild(document.createTextNode(result.n));
        row.insertCell(1).appendChild(document.createTextNode(result.x0));
        row.insertCell(2).appendChild(document.createTextNode(result.fx0));
    });
    row = table.insertRow(0);
    row.insertCell(0).appendChild(document.createTextNode("n"));
    row.insertCell(1).appendChild(document.createTextNode("x*"));
    row.insertCell(2).appendChild(document.createTextNode("f(x)*"));
}

function drawGraph(equation) {
    try {
        const expr = math.compile(equation)

        const xValues = math.range(-10, 10, 0.5).toArray()
        const yValues = xValues.map(function(x) {
            return expr.eval({ x: x })
        })

        const trace1 = {
            x: xValues,
            y: yValues,
            type: 'scatter'
        }
        const data = [trace1]
        Plotly.newPlot('plot', data)
    } catch (err) {
        console.error(err)
    }
}

function fx_dropdown(equation){        
    document.getElementById("dropdownMenuButton").value = equation;
}