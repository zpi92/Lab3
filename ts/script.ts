console.log("Всё работает хорошо!");

//Базовый класс
class Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {

    }

    //Инициализация карточки
    Init(): any {
        let h5 = document.createElement("h5");
        h5.setAttribute("class", "card-title");
        h5.innerHTML = this.name;

        let divprice = document.createElement("div");
        divprice.setAttribute("class", "col-6 p-0 text-primary font-weight-bold");
        divprice.innerHTML = this.price + " грн.";

        let divavail = document.createElement("div");
        if (this.IsAvailable()) {
            divavail.setAttribute("class", "col-6 p-0 text-right text-success");
            divavail.innerHTML = "Есть в наличии";
        }
        else {
            divavail.setAttribute("class", "col-6 p-0 text-right text-danger");
            divavail.innerHTML = "Нет в наличии";
        }

        let divrow = document.createElement("div");
        divrow.setAttribute("class", "row");
        divrow.appendChild(divprice);
        divrow.appendChild(divavail);

        let divcon = document.createElement("div");
        divcon.setAttribute("class", "container");
        divcon.appendChild(divrow);

        let p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = this.description;

        let a = document.createElement("a");
        a.setAttribute("id", this.id.toString());
        a.setAttribute("href", "#buyModal");
        a.setAttribute("class", "btn btn-primary");
        a.setAttribute("data-toggle", "modal");
        a.setAttribute("onclick", "WantBuy(this.id)");
        a.innerHTML = "Купить";

        let divfu = document.createElement("div");
        divfu.setAttribute("class", "card-footer");
        divfu.appendChild(a);

        let divcardb = document.createElement("div");
        divcardb.setAttribute("class", "card-body mh-100");
        divcardb.setAttribute("style", "height: 200px");
        divcardb.appendChild(h5);
        divcardb.appendChild(divcon);
        divcardb.appendChild(p);

        let divcard = document.createElement("div");
        divcard.setAttribute("class", "card");
        divcard.appendChild(divcardb);
        divcard.appendChild(divfu);

        let divcol = document.createElement("div");
        divcol.setAttribute("class", "col-md-6 col-xl-4 p-1");
        divcol.appendChild(divcard);

        return divcol;
    }

    //Добавление карточки в строку
    protected Embed(obj: any) {
        let prods = document.getElementById('rowts');
        prods.appendChild(obj);
    }

    //Определение есть ли товар в наличии
    IsAvailable(): boolean {
        return (this.inStock > 0) ? true : false;
    }
}


//Перечисление доступных цветов
enum Color { Black = "Чёрный", Gray = "Серый", Pink = "Розовый", White = "White", Blue ="Blue" };

//
enum Fabric { Cotton = "Cotton", Silk = "Silk", SilkBlend = "SilkBlend" }

//
enum Size { Twin = "Twin", Euro = "Euro", Standart ="Standart", Small ="Small"}

interface Shoes {
    dimension: number; //размер
    color: Color; //цвет
    quantity: number; //количество
}

//Класс со сложными особенностями
class FeltBoots extends Product {
    isBigSizes: boolean; //Есть большие размеры
    haveColors: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public list?: Shoes[]) {
        super(id, name, price, description, inStock);
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();

        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.list[i].dimension > 43 && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}

//Класс с группировкой
class Headphones extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isWireless?: boolean) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    public Init() {
        let obj = super.Init();

        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isWireless) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Беспроводные";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если эти конкретные наушники беспроводные и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isWireless') == null && this.isWireless != null && this.isWireless) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isWireless");
            inp.setAttribute("onclick", "CheckWireless(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "Только беспроводные<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        this.Embed(obj);
    }
}

//Группировка по беспроводным наушникам
function CheckWireless(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof Headphones && (<Headphones>productList[i]).isWireless) (<Headphones>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

interface Huckaback {
    size: Size; //размер
    color: Color; //цвет   
    fabric: Fabric; //ткань
    quantity: number; //количество
}

// 19.	Постільна білизна
class BedLinens extends Product {
    isBigSizes: boolean; //Есть большие размеры
    haveColors: string[]; //Цвета которые есть
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isSolidСolor?: boolean, public isBigSizes2?: boolean, public list?: Huckaback[]) {
        super(id, name, price, description, inStock);
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();

        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isSolidСolor) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "isSolidСolor";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если эти конкретные наушники isSolidСolor и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isSolidСolor') == null && this.isSolidСolor != null && this.isSolidСolor) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isSolidСolor");
            inp.setAttribute("onclick", "CheckisWireless1(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "isSolidСolor<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        //Если есть большие размеры, то добавляем информацию об этом в карточку
        if (this.isBigSizes) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть большие размеры";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о цвете, то добавляем её в карточку
        if (this.haveColors.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.haveColors[0];
            for (let i = 1; i < this.haveColors.length; i++) {
                str += ", " + this.haveColors[i];
            }
            p.innerHTML = "Есть цвета: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBigSizes = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.list[i].size > Size.Small && this.list[i].quantity > 0) {
                    this.isBigSizes = true;
                    break;
                }
        //Поиск доступных цветов
        let k = 0;
        this.haveColors = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.haveColors.indexOf(this.list[i].color) == -1)
                    this.haveColors[k++] = this.list[i].color;
    }
}


//Группировка по беспроводным наушникам
function CheckisWireless1(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof BedLinens && (<BedLinens>productList[i]).isSolidСolor) (<BedLinens>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

//
enum PowerSource { Electric = "Electric", Pneumatic = "Pneumatic" }
//enum BoreSize { AngleGringer = "Angle Gringer", WallChaser = "Wall Chaser", DieGringer = "Die Gringer"}


interface Tool  {
    powerSource: PowerSource; //размер
    color: Color; //цвет   
    boreSize: number; //размер
    quantity: number; //количество  
}

// 19.	болгарки
class AngleGrinder extends Product {
    isBigBoreSize: boolean; //Есть большие размеры
    havePowerSource: string[]; //havePowerSource
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number, public isMetalCutting?: boolean, public list?: Tool[]) {
        super(id, name, price, description, inStock);
        this.CalculateFlags();
        this.Init();
    }

    Init() {
        let obj = super.Init();

        //Если наушники беспроводные, то добавляем информацию об этом в карточку
        if (this.isMetalCutting) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "isMetalCutting";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если эти конкретные наушники isMetalCutting и нет чекбокса группировки, то добавляем его
        if (document.getElementById('isMetalCutting') == null && this.isMetalCutting != null && this.isMetalCutting) {
            let inp = document.createElement("input");
            inp.setAttribute("type", "checkbox");
            inp.setAttribute("id", "isMetalCutting");
            inp.setAttribute("onclick", "CheckWireless4(this.checked)");

            let lab = document.createElement("p");
            lab.appendChild(inp);
            lab.innerHTML += "isMetalCutting<br>";

            let div = document.getElementById('myTools');
            div.appendChild(lab);
        }

        //Если есть Type DieGringer, то добавляем информацию об этом в карточку
        if (this.isBigBoreSize) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            p.innerHTML = "Есть isBigBoreSize";
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        //Если есть информация о Power Source, то добавляем её в карточку
        if (this.havePowerSource.length > 0) {
            let p = document.createElement("p");
            p.setAttribute("class", "card-text text-info m-0");
            let str = this.havePowerSource[0];
            for (let i = 1; i < this.havePowerSource.length; i++) {
                str += ", " + this.havePowerSource[i];
            }
            p.innerHTML = "Есть havePowerSource: " + str;
            obj.firstChild.firstChild.insertBefore(p, obj.firstChild.firstChild.childNodes[2]);
        }

        this.Embed(obj);
    }

    //Вычисление сложных особенностей
    CalculateFlags() {
        //Поиск больших размеров
        this.isBigBoreSize = false;
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.list[i].boreSize > 10 && this.list[i].quantity > 0) {
                    this.isBigBoreSize = true;
                    break;
                }
        //Поиск доступных Power Source
        let k = 0;
        this.havePowerSource = [];
        if (this.list != null)
            for (let i = 0; i < this.list.length; i++)
                if (this.havePowerSource.indexOf(this.list[i].powerSource) == -1)
                    this.havePowerSource[k++] = this.list[i].powerSource;
    }
}

//Группировка по беспроводным наушникам
function CheckWireless4(flag: boolean) {
    document.getElementById('rowts').innerHTML = "";
    if (flag) {
        for (let i = 0; i < this.productList.length; i++)
            if (productList[i] instanceof AngleGrinder && (<AngleGrinder>productList[i]).isMetalCutting) (<AngleGrinder>productList[i]).Init();
    }
    else {
        for (let i = 0; i < this.productList.length; i++)
            productList[i].Init();
    }
}

//Класс пока не имеющий отличий от базового
class Balalaika extends Product {
    constructor(protected id: number, public name: string, public price: number, public description: string, public inStock: number) {
        super(id, name, price, description, inStock);
        this.Init();
    }

    Init() {
        this.Embed(super.Init());
    }
}

interface BasketRecord {
    id: number; //id товара
    quantity: number; //Его количество
}

class Basket {
    private list: BasketRecord[] = []; //Список товаров в корзине

    constructor() {

    }

    //Добавить товар в корзину. Возвращает результат операции
    Add(val: number): boolean {
        let num = +(<HTMLInputElement>document.getElementById('inputquantity')).value;

        //Проверка введенного количества товара. Если ввели ерунду, то выводится сообщение об ошибке. Иначе товар добавляется в корзину
        if (isNaN(num) || !((num ^ 0) === num) || num == 0 || productList[val].inStock < num) {
            if (productList[val].inStock < num) document.getElementById('modlalMessag').innerHTML = "Столько на складе нет. В наличии " + productList[val].inStock + " штук ";
            else document.getElementById('modlalMessag').innerHTML = "Введите целое число";
            return false;
        }
        else {
            document.getElementById('modlalMessag').innerHTML = "";
            productList[val].inStock -= num;

            let dd = this.list.filter(e => e.id === val);
            if (dd.length > 0) {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == val)
                        this.list[i].quantity += num;
                }
            }
            else {
                this.list[this.list.length] = { id: val, quantity: num };
            }                   
           

            this.CalculateBasket();
            return true;
        }
    }

    //Пересчитать товары в корзине
    CalculateBasket() {
        if (this.list.length > 0) {
            let id;
            let total: number = 0;
            let message: string = "В даннвй момент в корзине:<br>";
            for (let i = 0; i < this.list.length; i++) {
                message += productList[this.list[i].id].name + " - " + this.list[i].quantity + "<br>";
                total += productList[this.list[i].id].price * this.list[i].quantity;
            }
            message += "<br><br>На общую сумму " + total + " грн.";

            document.getElementById('myBasket').innerHTML = message;
        }
        else document.getElementById('myBasket').innerHTML = "В данный момент корзина пустая";
    }
}


//Действие на кнопке "добавить в корзину"
function myByBtn(val: any) {
    if (basket.Add(val)) {
        $('#buyModal').modal('hide');
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }
}

//Действие на кнопке "купить"
function WantBuy(val: any) {
    document.getElementById('modlalBtn').setAttribute("value", val);
}

//Инициализация корзины
let basket: Basket = new Basket();
//Список продуктов
let productList: Product[] = [
    new Headphones(0, "Наушники фирмы1", 816, "Прекрасные наушники! Сама английская королева слушает жесткий металл через такие же!", 4, true),
    new FeltBoots(1, "Валенки2", 91.2, "Хороший выбор! В них тепло, хорошо. Обувь многосезонная - лето, осень, зима, весна.", 6,
        [{ dimension: 44, color: Color.Black, quantity: 2 },
        { dimension: 43, color: Color.Black, quantity: 3 },
        { dimension: 42, color: Color.Black, quantity: 1 },
        { dimension: 41, color: Color.Black, quantity: 2 },
        { dimension: 44, color: Color.Gray, quantity: 2 },
        { dimension: 39, color: Color.Gray, quantity: 1 },
        { dimension: 45, color: Color.Gray, quantity: 1 },
        { dimension: 42, color: Color.Gray, quantity: 1 },
        ]),
    new Headphones(2, "Наушники фирмы4", 119.50, "Дёшево не значит плохо! Эти наушники стоят своих денег!", 30, false),
    new Headphones(3, "Наушники фирмы2", 144, "Это оптимальный выбор! Налетай торопись!", 15, true),
    new Balalaika(4, "Балалайка1", 915, "Сам страдивари её выстругал! Мастер Страдивари Аарон Моисеевич ©. В комплекте к балалайке должен идти медведь.", 1),
    new FeltBoots(5, "Валенки3", 65, "Валенки знаменитой российской фабрики Красный ЦинБаоЧен. Оригинальный продукт сделаный по технологиям прошлого.", 1),
    new Headphones(6, "Наушники фирмы3", 265, "Тру поклонники музыки обязательно такие имеют! А ты что? Ты не тру?!", 0),
    new FeltBoots(7, "Валенки1", 666.66, "Валенки великолепной работы слепого мастера Игната! В комплекте к валенкам идёт кокошник.", 2,
        [{ dimension: 45, color: Color.Pink, quantity: 1 },
        { dimension: 43, color: Color.Pink, quantity: 1 }
        ]),
    new Balalaika(8, "Балалайка2", 217, "Обычная балалайка белорусской фирмы Змрочныя мелодыі.", 1),

    new BedLinens(9, "Linens1", 170.5, "Уникальнаяи экологически чистая продукция.", 6, true, true,
        [{ size: Size.Standart, fabric: Fabric.Cotton, color: Color.Pink, quantity: 2 },
        { size: Size.Standart, fabric: Fabric.Cotton, color: Color.White, quantity: 3 },
        { size: Size.Standart, fabric: Fabric.Silk, color: Color.Black, quantity: 1 },
        { size: Size.Standart, fabric: Fabric.Cotton, color: Color.Black, quantity: 2 },
        { size: Size.Small, fabric: Fabric.Cotton, color: Color.White, quantity: 2 },
        { size: Size.Standart, fabric: Fabric.Silk, color: Color.White, quantity: 1 },
        { size: Size.Euro, fabric: Fabric.Cotton, color: Color.Black, quantity: 1 },
        { size: Size.Standart, fabric: Fabric.SilkBlend, color: Color.White, quantity: 1 }
        ]),

    new BedLinens(10, "Linens2", 120, "Постельный комплект отшивается из бязи, которая не способствует раздражению кожи, мягкая на ощупь, практичная для ежедневого сна.", 2, false, true),
    new BedLinens(11, "Linens3", 150, "Роскошный шелковый комплект в однотонной гамме – это верх совершенства и утонченности ", 4, true, false),

    new AngleGrinder(12, "AngleGrinder1", 853.29, "Защищенные от пыли шарикоподшипники для длительного срока эксплуатации машины.", 2, true,
        [{ powerSource: PowerSource.Electric, color: Color.Pink, boreSize: 10, quantity: 1 },
        { powerSource: PowerSource.Pneumatic, color: Color.Pink, boreSize: 20, quantity: 8 }
        ]),

    new AngleGrinder(13, "AngleGrinder2", 813.29, "Легкая, ручная шлифовальная машина с идеальной эргономикой", 2, false,
        [{ powerSource: PowerSource.Pneumatic, color: Color.Black, boreSize: 15, quantity: 2 },
        { powerSource: PowerSource.Electric, color: Color.White, boreSize: 21, quantity: 8 }
        ])
    ]
