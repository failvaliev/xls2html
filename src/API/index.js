const path = require("path");
const fs = require('fs');
const XLSX = require("xlsx");
const xmlConvert = require('xml-js');
const e = require("express");

const LIST_XLSX_PATH = path.resolve(__dirname, `./../../files/list.xlsx`);
const INPORT_XML_PATH = path.resolve(__dirname, `./../../files/import.xml`);

//return arr
function floatParser(str) {
  return str.match(/[+-]?\d+(\,\d+)?/g)
}

const techGroupType = {
  AV: 'АВ',
  AVI: 'АВИ, АВК',
  ACK: 'АЦК',
  AKN: 'АКН, АКНС',
  ATZ: 'АТЗ',
  ACN: 'АЦН',
  AC: 'АЦ',
  ACPT: 'АЦПТ',
  AC32: 'АЦ-32',
  PC: 'ПЦ',
  PPC: 'ППЦ',
  PPT: 'ППТ',
  PPB: 'ППБ'
}

class TechnicsParam {
  numOrder = -1; //№ заявки
  linkOrder = ''; //ссылка заявки
  count = -1;
  typeTech = '';//Тип
  chassis = ''; //Шасси
  box = '';     //Коробка
  KOM = '';     //КОМ
  pump = '';    //Насос
  neckTop = ''; //Горловина верх
  neckDrain = '';//Горловина слив
  platform = '' //Площадка
  eyelet = '';  //Глазок
  note = '';    //Уточнения
  folderOrder = '';//папка заявки
  linkFolderOrder = '';//ссылка папка заявки
  errors = ''   //Ошибки
  dateArriveOrder = '';//дата прихода заявки
  dateReleaseOrder = '';//дата выхода заявки
  year = '';    //Год
  price = -1;   //стоимость
  orderYear = '';//год - лист xcls
}

class Technics extends TechnicsParam {
  coefficient = 0;//Коэффициент
  volume = '';    //объем
  shell = '';     //Обечайка 
  bottomOpening = '';//Открывание дна
  waterTanks = ''; //Баки для воды
  washoutSystem = ''; //Система размыва
  pupmOUT = '';     //Насос для вывода вместо pump
  compartment = ''; //Отсек
  VPB = '';       //ВПБ
  group = '';     //тип навески 
}

class XlsxProc {
  constructor() {
    this.listXlsx;
    this.importXml;
    this.technicsList = [];
  }

  readFiles() {
    this.listXlsx = XLSX.readFile(LIST_XLSX_PATH);

    const xml = fs.readFileSync(INPORT_XML_PATH, 'utf8');
    const options = {
      ignoreComment: true,
      alwaysChildren: false,
      compact: true
    };
    this.importXml = xmlConvert.xml2js(xml, options);
  }

  writeJSON() {
    let outStrJSON = '';
    // const options = {};
    // this.listXlsx.SheetNames.forEach(name => {
    //   outStrJSON += JSON.stringify(XLSX.utils.sheet_to_json(this.listXlsx.Sheets[name], options));
    // })

    // fs.writeFile("output.json", outStrJSON, 'utf-8', err => {
    //   if (err) return console.log(err);
    //   console.log("JSON file has been saved.");
    // })
    outStrJSON = JSON.stringify(this.regroupForExport());
    fs.writeFile("output.json", outStrJSON, 'utf-8', err => {
      if (err) return console.log(err);
      console.log("JSON file has been saved.");
    })
  }

  regroupForExport() {
    const res = {};

    for (const key in techGroupType) {
      if (Object.hasOwnProperty.call(techGroupType, key)) {
        res[techGroupType[key]] = []
      }
    }

    for (let i = 0; i < this.technicsList.length; i++) {
      const tech = this.technicsList[i];
      let item = {};

      switch (tech.group) {
        case techGroupType.AV:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.AVI:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            'Баки для воды': tech.waterTanks,
            'Система размыва': tech.washoutSystem,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.ACK:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            'Баки для воды': tech.waterTanks,
            'Система размыва': tech.washoutSystem,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.AKN:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            'Баки для воды': tech.waterTanks,
            'Система размыва': tech.washoutSystem,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.ATZ:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Отсеков': tech.compartment,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            '№ заявки': tech.numOrder,
            'Уточнения': tech.note,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.ACN:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Отсеков': tech.compartment,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.AC:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Отсеков': tech.compartment,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            '№ заявки': tech.numOrder,
            'Уточнения': tech.note,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.ACPT:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Отсеков': tech.compartment,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            '№ заявки': tech.numOrder,
            'Уточнения': tech.note,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.AC32:
          item = {
            'Насос': tech.pupmOUT,
            'ВПБ': tech.VPB,
          }
          break;

        case techGroupType.PC:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.PPC:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.PPT:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        case techGroupType.PPB:
          item = {
            'Шасси': tech.chassis,
            'Коробка': tech.box,
            'Объем': tech.volume,
            'Обечайка': tech.shell,
            'Насос': tech.pupmOUT,
            'КОМ': tech.KOM,
            'Открывание дна': tech.bottomOpening,
            '№ заявки': tech.numOrder,
            'папка заявки': tech.folderOrder,
            'Стоимость': tech.price,
            _orderLink: tech.linkOrder,
            _orderFolderLink: tech.linkFolderOrder
          }
          break;

        default:
          break;
      }

      // console.log(item);
      item['Тип'] = tech.typeTech;

      if (res[tech.group]) res[tech.group].push(item);
    }

    return res
  }

  construcTechnicsList() {
    //дергаю всю таблицу

    for (const sheetName in this.listXlsx.Sheets) {
      if (Object.hasOwnProperty.call(this.listXlsx.Sheets, sheetName)) { // && sheetName === '2022'

        let tech; //данные из таблицы для создания техники
        // let errorLine = false; //пропуск пустой строки

        for (const cellName in this.listXlsx.Sheets[sheetName]) {
          if (Object.hasOwnProperty.call(this.listXlsx.Sheets[sheetName], cellName)) {

            const row = Number(cellName.substring(1));

            if (row !== 1) { // && row <= 100 // && row > 127 && row < 134
              const cell = this.listXlsx.Sheets[sheetName][cellName];
              const column = cellName[0];

              if (row > 1) {
                if (column === 'A') {

                  if (tech) { //!errorLine && 
                    if (tech.typeTech) { //против пустых строк
                      tech.orderYear = sheetName;
                      this.technicsList.push(this.construcTechnics(tech));
                    }
                  }
                  // if (errorLine) errorLine = false;
                  tech = new TechnicsParam();
                }

                //текущая строка
                try {
                  // if (!errorLine) {
                  if (column === 'A') tech.numOrder = cell.v;
                  if (column === 'A') tech.linkOrder = cell.l && cell.l.Target ? cell.l.Target : '';
                  if (column === 'B') tech.count = cell.v;
                  if (column === 'C') tech.typeTech = cell.v;
                  if (column === 'D') tech.chassis = cell.v;
                  if (column === 'E') tech.box = cell.v.toString();
                  if (column === 'F') tech.KOM = cell.v;
                  if (column === 'G') tech.pump = cell.v;
                  if (column === 'H') tech.neckTop = cell.v.toString();
                  if (column === 'I') tech.neckDrain = cell.v;
                  if (column === 'J') tech.platform = cell.v;
                  if (column === 'K') tech.eyelet = cell.v;
                  if (column === 'L') tech.note = cell.v;
                  if (column === 'M') tech.folderOrder = cell.v;
                  if (column === 'M') tech.linkFolderOrder = cell.l && cell.l.Target ? cell.l.Target : '';
                  if (column === 'O') tech.dateArriveOrder = cell.v;
                  if (column === 'P') tech.dateReleaseOrder = cell.v;
                  // }
                } catch (error) {
                  // errorLine = true;
                  console.log('construcTechnicsList:', tech, error);
                  // tech = undefined;
                }
              }
            }
          }
        }

        if (tech) {
          if (tech.typeTech) {
            tech.orderYear = sheetName;
            // console.log('крайний', tech);
            this.technicsList.push(this.construcTechnics(tech));
          }
        }
      }
    }
  }

  construcTechnics(techParam) {
    const technics = new Technics();

    for (const key in techParam) {
      technics[key] = techParam[key];
    }

    this.calcPrice(technics);
    this.setVolume(technics);
    this.setShell(technics);
    this.setPumpOut(technics);
    this.setBottomOpening(technics);
    this.setNumOrder(technics);
    this.setWaterTanks(technics);
    this.setWashoutSystem(technics);
    this.setCompartment(technics);
    this.setVPB(technics);
    this.setGroup(technics);

    return technics
  }

  //расчет цены и установка Коэффициент //1,88*300000+789472.71
  //все среднее арифмет-е
  calcPrice(technics) {
    try {
      const orderNum = `${technics.numOrder}`;
      const year = `${technics.orderYear}`.substring(2); //22
      let sumPrice = 0;
      let sumCoef = 0;
      let countEqualTech = 0;

      const xml = this.importXml['ВыгрузкаДляСайта']['Элемент'];

      for (const key in xml) {
        if (Object.hasOwnProperty.call(xml, key)) {
          const elem = xml[key]['_attributes'];
          const orderName = elem['Заявка'];

          if (orderName.slice(-2) === year) {
            let num = orderName.split(' ')[0]; //001 (АВ-3,5И)/22 => 001
            if (num.split('-')[1]) num = num.split('-')[0]; //368-4 => 368
            num = num.replace(/^0+/, ''); //001 => 1

            if (num === orderNum) {
              const coef = Number(elem['КоэффициентТрудоемкости']); //1,88
              const price = Number(elem['СтоимостьТовара']); //789472.71
              const markup = Number(elem['СтандартнаяНаценка']); //300000

              sumPrice += coef * markup + price;
              sumCoef += coef;
              countEqualTech++;
            }
          }
        }
      }

      if (!sumPrice) {
        technics.price = 'Не хватает данных';
        technics.coefficient = '';
      } else {
        technics.price = +(sumPrice / countEqualTech).toFixed(2);
        technics.coefficient = +(sumCoef / countEqualTech).toFixed(2);
      }
    } catch (error) {
      console.log('calcPrice:', technics, error);
    }
  }

  setVolume(technics) {
    //Объем  Из файла Информация по заявкам.xlsx, смотрим в переменную Тип' и берем число после дефиса
    try {
      const s = technics.typeTech.split('-'); //"12,1\r\n(1150)"
      if (s[1]) {
        let t = s[1];
        if (t.split('(')[1]) t = t.split('(')[0];

        t = floatParser(t); //[ "12,1"]
        if (t[0]) technics.volume = parseFloat(t[0]);
      }
    } catch (error) {
      console.log('setVolume:', technics, error);
    }
  }

  setShell(technics) {
    //смотрим в переменную Уточнения', и берем текст перед «мм». 
    //"5+5мм, фильера, локеры оцинков, ящик ЗИП-УВТ"
    try {
      if (technics.note) {
        const s = technics.note.split('мм'); //5+5
        if (s[0]) {
          let t = s[0].match(/[+-]?\d+(\,\d+)?/g); //[ "5", "+5" ]

          if (t && t.length && t.length > 0)
            technics.shell = parseFloat(t[t.length - 1]);
        }
      }
    } catch (error) {
      console.log('setShell:', technics, error);
    }
  }

  setPumpOut(technics) {
    //смотрим в переменную Насос', и берем текст до переноса строки
    // (если переноса нет, то берем всю строку)
    //"PNR-124 левый\r\nUDOR VXX-B 215/160"
    try {
      const pupm = technics.pump;
      if (pupm) {
        technics.pupmOUT = pupm.split('\n')[0];
      }
    } catch (error) {
      console.log('setPumpOut:', technics, error);
    }
  }

  setBottomOpening(technics) {
    //смотрим в переменную Тип, ищем ОД или ОДГ. Если нашли,
    // то пишем соответственно ОД или ОДГ.
    try {
      if (technics.typeTech) {
        if (technics.typeTech.split('ОД').length > 1)
          technics.bottomOpening = 'ОД';

        if (technics.typeTech.split('ОДГ').length > 1)
          technics.bottomOpening = 'ОДГ';
      }
    } catch (error) {
      console.log('setBottomOpening:', technics, error);
    }
  }

  setNumOrder(technics) {
    //№ заявки = из файла Информация по заявкам.xlsx, № заявки' (важно забрать и 
    //гиперссылку). Отображаем так: № заявки/год
    try {
      technics.numOrder = technics.numOrder + '/' + technics.orderYear;
    } catch (error) {
      console.log('setNumOrder:', technics, error);
    }
  }

  setWaterTanks(technics) {
    //смотрим в переменную Тип и число после символа + 
    //МВ ОДГ-10+1,5 (1700) 	→ 1,5
    //или АКН-8(4+4) (1700)
    try {
      let s = technics.typeTech.split('(')[0]; //МВ ОДГ-10+1,5
      s = s.split('+');
      if (s[1]) {
        let t = floatParser(t);
        if (t && t.length) technics.waterTanks = t[0];
      }
    } catch (error) {
      console.log('setWaterTanks:', technics, error);
    }
  }

  setWashoutSystem(technics) {
    //если в переменной «баки для воды» не пусто, то из файла Информация по заявкам.xlsx,
    // смотрим в переменную Насос и берем то, что после переноса строки
    try {
      if (technics.waterTanks && technics.pump) {
        let t = technics.pump = pupm.split('\n');
        if (t[1]) technics.washoutSystem = t[1];
      }
    } catch (error) {
      console.log('setWashoutSystem:', technics, error);
    }
  }

  setCompartment(technics) {
    //Отсеков из файла Информация по заявкам.xlsx, смотрим в переменную Горловина верх 
    //и берем число перед «шт»
    //500 Алюм(УД-2) - 2шт. 	→ 2
    try {
      if (technics.neckTop) {
        const s = technics.neckTop.toString().split('шт');
        if (s.length > 1) {
          let t = s[0].split('-');
          t.length > 1 ? t = t[1] : t[0];

          t = floatParser(t);
          if (t.length) technics.compartment = t[t.length - 1];
        }
      }
    } catch (error) {
      console.log('setCompartment:', technics, error);
    }
  }

  setVPB(technics) {
    try {
      if (technics.note) {
        technics.VPB = technics.note;
      }
    } catch (error) {
      console.log('setVPB:', technics, error);
    }
  }

  setGroup(technics) {
    try {
      let rawType = technics.typeTech;
      //for АЦ-32
      if (rawType.toUpperCase().indexOf(techGroupType.AC32) > -1) {
        rawType = techGroupType.AC32;
      } else {
        rawType = rawType.split('-')[0];
      }

      let resultType = '';
      const type = rawType.toUpperCase();

      if ((type.indexOf('МВ') > -1 || type.indexOf('АВ') > -1) && !technics.bottomOpening) {
        //АВ, АВОД
        resultType = techGroupType.AV;

      } else if (type === 'АВОД') {
        //АВ, АВОД
        if (technics.bottomOpening) {
          resultType = techGroupType.AV
        } else {
          this.writeError(`ТИП’=${type} содержит Открывание дна ${technics.bottomOpening}`, technics);
        }

      } else if ((type.indexOf('МВ') > -1 || type.indexOf('АВ') > -1)
        && technics.bottomOpening === 'ОДГ') {
        //АВИ, АВК
        resultType = techGroupType.AVI

      } else if (type.indexOf('КАНАЛОПРОМ') > -1) {
        if (technics.pupmOUT.indexOf('UDOR') > -1 || technics.pupmOUT.indexOf('HPP') > -1) {
          //АЦК
          resultType = techGroupType.ACK
        } else {
          this.writeError(`ТИП’=${type} не содержит Насос UDOR, HPP`, technics);
        }

      } else if (type.indexOf('АЦ') > -1
        && (technics.pupmOUT.indexOf('UDOR') > -1 || technics.pupmOUT.indexOf('HPP') > -1)) {
        //АЦК
        resultType = techGroupType.ACK

      } else if (type.indexOf('АКН') > -1 || type.indexOf('АКНС') > -1) {
        //АКН, АКНС
        resultType = techGroupType.AKN

      } else if (type.indexOf('АТЗ') > -1) {
        //АТЗ
        resultType = techGroupType.ATZ

      } else if (type.indexOf('АЦ') > -1 && type.indexOf('АЦПТ') === -1
        && technics.neckTop.indexOf('УД-2') > -1) {
        //АЦН
        resultType = techGroupType.ACN

      } else if (type.indexOf('АЦ') > -1 && type.indexOf('АЦПТ') === -1
        && technics.neckTop.indexOf('УД-1') > -1
        && (technics.pupmOUT.indexOf('UDOR') === -1 && technics.pupmOUT.indexOf('HPP') === -1)) {
        //АЦ
        //АЦ ↔ (ТИП’ ⊃ {АЦ, АЦН} &&  Горловина верх ⊃ {УД-1} &&  Насос !   {UDOR, HPP})
        resultType = techGroupType.AC

      } else if (type.indexOf('АЦПТ') > -1) {
        //АЦПТ
        resultType = techGroupType.ACPT

      } else if (type === 'АЦ-32') {
        //АЦ-32
        resultType = techGroupType.AC32

      } else if (type.indexOf('ПЦ') > -1 && type.indexOf('ППЦ') === -1) {
        //ПЦ
        resultType = techGroupType.PC

      } else if (type.indexOf('ППЦ') > -1) {
        //ППЦ
        resultType = techGroupType.PPC

      } else if (type.indexOf('ППТ') > -1) {
        //ППТ
        resultType = techGroupType.PPT

      } else if (type.indexOf('ППБ') > -1) {
        //ППБ
        resultType = techGroupType.PPB

      } else {
        this.writeError(`ТИП’=${type} не определен тип техники`, technics);
      }

      technics.group = resultType;
    } catch (error) {
      console.log('setGroup:', technics, error);
    }
  }

  writeError(msg, technics) {
    // console.log(msg, technics);

    const logPath = path.resolve(__dirname, `./../../log.log`);

    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const currentDate = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    const str = currentDate + ' ' + msg + '. ' + 'Заявка: ' + technics.numOrder;

    fs.appendFile(logPath, str + '\n', 'utf-8', err => {
      if (err) return console.log(err);
      console.log(str, ". log file has been updated.");
    })
  }
}

module.exports = function startProc() {
  const proc = new XlsxProc();
  proc.readFiles();
  proc.construcTechnicsList();

  //console.log(proc.technicsList);
  proc.writeJSON();
}