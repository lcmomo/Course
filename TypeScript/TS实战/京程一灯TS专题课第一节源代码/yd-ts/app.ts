import { parseScript } from 'esprima';
import { Pattern } from 'estree';
import CreateIoc from './ioc';
import 'reflect-metadata';
const container = new CreateIoc();

interface ITypes {
  [key: string]: Symbol;
}
const TYPES: ITypes = {
  indexService: Symbol.for('indexService'),
};
interface IIndexService {
  log(str: string): void;
}

class IndexService implements IIndexService {
  public log(str: string): void {
    console.log(str);
  }
}

container.bind(TYPES.indexService, () => new IndexService());
//获取函数的参数名
function getParmas(fn: Function) {
  const ast = parseScript(fn.toString());
  const node = ast.body[0];
  let fnParams: Pattern[] = [];
  if (node.type === 'FunctionDeclaration') {
    fnParams = node.params;
  }
  let validParams: string[] = [];
  fnParams.forEach((obj) => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name);
    }
  });
  //   console.log('validParams: ', validParams);
  return validParams;
}
//判断一个对象是否有对应的key
function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
  return obj.hasOwnProperty(key);
}
function inject(serviceIdentifier: Symbol): Function {
  return (target: Function, targetKey: string, index: number) => {
    if (!targetKey) {
      Reflect.defineMetadata(
        serviceIdentifier,
        container.get(serviceIdentifier),
        target
      );
    }
  };
}
// {} object 代码块 函数体。。
function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    constructor(...args: any[]) {
      super(args);
      const _params = getParmas(constructor);
      let _identity: string;
      for (_identity of _params) {
        const _meta = Reflect.getMetadata(TYPES[_identity], constructor);
        if (hasKey(this, _identity) && _meta) {
          this[_identity] = _meta;
          //   this[_identity] = container.get(TYPES[_identity]);
        }
      }
    }
  }
  return Controller;
}

@controller
class IndexController {
  private indexService: IIndexService;
  constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
    this.indexService = indexService!;
    console.log('我是原来的构造函数');
  }
  info() {
    this.indexService.log('京程一灯🏮');
  }
}

//① Controller + IndexService 最蠢的办法
//② 需要的参数透传出来
// const indexService = new IndexService();
// const index = new IndexController(indexService);
// ③ DI
// const index = new IndexController(null);
// index.info();
// ④ 一步到位
const index = new IndexController();
index.info();
