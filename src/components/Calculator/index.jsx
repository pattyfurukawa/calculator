import React from 'react';
import style from './style';
import ButtonTest from '../ButtonTest';

function Percent(a, b, operation) {
  var perc = b/100;
  var p = a*perc;
  return Solve(a, p, operation);
}

function Solve(a, b, operation) {
  if (operation == "sum")
    var n = +a + +b;
  else if (operation == "sub")
    var n = a - b;
  else if (operation == "mult")
    var n = a * b;
  else if (operation == "div")
    var n = a / b;
  else
    return "Error";

  if ((n % 1) > 0)
    n = n.toFixed(3);

  return n;
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hist: '', result: '', n1: '', n2: '', dec: true, curr: true, operation: '', equal: false, backupn: '', backupop: ''};
  }

  clickNum = (n) => {
    if (this.state.curr)
      this.setState({n1: this.state.n1.concat(n), hist: this.state.hist.concat(n)});
    else
      this.setState({n2: this.state.n2.concat(n), hist: this.state.hist.concat(n)});
  }

  clickSym = (op,oper) => {
    if (this.state.curr || this.state.equal)
      this.setState({dec: true, curr: false, operation: oper, hist: this.state.hist.concat(op)});
    else {
      var r = Solve(this.state.n1, this.state.n2, this.state.operation);
      var t = "";
      var bupn = this.state.n1;
      var bupop = this.state.operation;
      t = t.concat(r);
      this.setState({result: t, n1: t, n2:'', dec: true, operation: oper, hist: this.state.hist.concat(op)})
    }
  }

  clickEqual = () => {
    console.log(this.state.equal);
    if(this.state.equal) {
      if (this.state.n2 === '')
        this.setState({hist:'', result:'', n1:'', n2:'', dec: true, curr: true, operation:'', equal: false});
      else {
        var r = Solve(this.state.n1, this.state.n2, this.state.operation);
        var t = '';
        t = t.concat(r);
        this.setState({result: t, n1: t, n2: '', dec: true, curr: true, operation: ''});
      }
    } else {
      var r = Solve(this.state.n1, this.state.n2, this.state.operation);
      var t = '';
      t = t.concat(r);
      this.setState({result: t, n1: t, n2:'', dec:true, curr:false, operation:'', equal: true});
    }
  }

  clickDec = () => {
    if (this.state.dec) {
      if(this.state.curr)
        this.setState({n1: this.state.n1.concat("."), dec: false, hist: this.state.hist.concat(".")});
      else
        this.setState({n2: this.state.n2.concat("."), dec: false, hist: this.state.hist.concat(".")});
    }
  }

  clickDel = () => {
    var hists = this.state.hist.length - 1;
    if (this.state.curr) {
      var n1s = this.state.n1.length - 1;
      var dec = this.state.n1.substr(n1s, 1);
      this.setState({n1: this.state.n1.substr(0, n1s), hist: this.state.hist.substr(0,hists)});
      if (this.state.dec === false && dec === '.')
        this.setState({dec: true});
    }
    else {
      if (this.state.n2.length != 0) {
        var n2s = this.state.n2.length - 1;
        var dec = this.state.n2.substr(n2s, 1);
        this.setState({n2: this.state.n2.substr(0,n2s), hist: this.state.hist.substr(0,hists)});
        if(this.state.dec === false && dec === '.')
          this.setState({dec: true});
      }
      else
        this.setState({operation: '', curr: true, hist: this.state.hist.substr(0,hists)});
    }
  }

  clickSign = () => {
    if (this.state.curr) {
      var sign = this.state.n1.substr(0,1);
      if (sign === '-')
        this.setState({n1: this.state.n1.substr(1, this.state.n1.length), hist: this.state.hist.substr(1, this.state.hist.length)});
      else
        this.setState({n1: '-'.concat(this.state.n1), hist: '-'.concat(this.state.hist)});
    } else {
        if(this.state.n2.length === 0)
          this.setState({n2: '-', hist: this.state.hist.concat('-')});
        else {
          var s = this.state.n1.length;
          var h = this.state.n1.concat(this.state.hist.substr(s,1), '-', this.state.hist.substr(s+1));
          this.setState({n2: '-'.concat(this.state.n2), hist: h});
        }
    }
  }

  clickPercentage = () => {
    if(this.state.curr) {
      var r = this.state.n1/100;
      this.setState({n1:r, hist: this.state.n1+'%'});
    } else {
      var r = Percent(this.state.n1, this.state.n2, this.state.operation);
      this.setState({n1: r, result: r, n2:'', hist: this.state.hist + '%', backupn: this.state.n1});
    }
  }


  render() {
    return (
      <div className='calculator'>
        <div className='hist' id='history'>{this.state.hist}</div>
        <div className='res' id='result'>{this.state.result}</div>
        <div>
          <ButtonTest type='num' name='del' onClick={() => this.clickDel()}/>
          <ButtonTest type='num' name='+/-' onClick={() => this.clickSign()}/>
          <ButtonTest type='num' name='%' onClick={() => this.clickPercentage()}/>
          <ButtonTest type='sym' name='/' onClick={() => this.clickSym('/', 'div')}/>
        </div>
        <div>
          <ButtonTest type='num' name='7' onClick={() => this.clickNum('7')}/>
          <ButtonTest type='num' name='8' onClick={() => this.clickNum('8')}/>
          <ButtonTest type='num' name='9' onClick={() => this.clickNum('9')}/>
          <ButtonTest type='sym' name='*' onClick={() => this.clickSym('*', 'mult')}/>
        </div>
         <div>
           <ButtonTest type='num' name='4' onClick={() => this.clickNum('4')}/>
           <ButtonTest type='num' name='5' onClick={() => this.clickNum('5')}/>
           <ButtonTest type='num' name='6' onClick={() => this.clickNum('6')}/>
           <ButtonTest type='sym' name='+' onClick={() => this.clickSym('+', 'sum')}/>
        </div>
         <div>
           <ButtonTest type='num' name='1' onClick={() => this.clickNum('1')}/>
           <ButtonTest type='num' name='2' onClick={() => this.clickNum('2')}/>
           <ButtonTest type='num' name='3' onClick={() => this.clickNum('3')}/>
           <ButtonTest type='sym' name='-' onClick={() => this.clickSym('-', 'sub')}/>
        </div>
        <div>
          <ButtonTest type='cero' name='0' onClick={() => this.clickNum('0')}/>
          <ButtonTest type='num' name='.' onClick={() => this.clickDec()}/>
          <ButtonTest type='sym' name='=' onClick={() => this.clickEqual()}/>
        </div>
      </div>

    );
  }
};

export default Calculator;
