'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var gameHeight = 50;
var gameWidth = 50;
var gameArray = [];
var playingGame;
var speedName = 'Medium';
var sizeName = 'Large';
var gameSpeed = 100;

var Run = function (_React$Component) {
  _inherits(Run, _React$Component);

  function Run(props) {
    _classCallCheck(this, Run);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      counter: 0,
      touch: 0,
      d: {
        backgrouncColor: 'black',
        width: '10px',
        height: '10px'
      },
      a: {
        backgrouncColor: 'red',
        width: '10px',
        height: '10px'
      },
      edit: 'Play'
    };

    return _this;
  }

  Run.prototype.componentWillMount = function componentWillMount() {
    //first for loop to play

    for (var i = 0; i < gameWidth; i++) {
      var arr = [];
      for (var j = 0; j < gameHeight; j++) {
        //  var ran = Math.random()>0.5 ? 'd':'a'
        arr.push('d');
      }
      gameArray.push(arr);
    }
  };
  //called when clicked then change the box

  Run.prototype.test2 = function test2(event) {
    if (this.state.edit == 'Play') {
      //console.log($('.game-play').width());
      var num = event.target.id.split(',');

      var row = Number(num[1]);
      var column = Number(num[0]);
      //console.log(event.target.className);
      gameArray[column][row] = gameArray[column][row] == 'd' ? 'a' : 'd';
      event.target.className = gameArray[column][row];
      this.setState({ touch: this.state.touch + 1 });
    }
  };
  //changeSize

  Run.prototype.sizeChanger = function sizeChanger(w, h, event) {
    if (this.state.edit == 'Play') {
      sizeName = event.target.innerHTML;
      gameWidth = w;
      gameHeight = h;
      $('.game-play').css('width', gameWidth * 15 + 20 + 'px').css('margin-left', (1200 - gameWidth * 15 + 20) / 2 + 'px');

      this.randomize('reset');
    }
  };
  //speedChange

  Run.prototype.speedChanger = function speedChanger(spe, event) {
    if (this.state.edit == 'Play') {
      speedName = event.target.innerHTML;
      //this.switcher();
      gameSpeed = spe;
      //this.switcher();
      this.setState({
        touch: this.state.touch + 1
      });
      //this.randomize('reset');
    } /*else{
       speedName=event.target.innerHTML;
      // this.switcher();
      gameSpeed=spe;  
       this.switcher();
       console.log(this.state.edit);
       //this.switcher();
      console.log(this.state.edit);  
      }*/
  };
  //randomize

  Run.prototype.randomize = function randomize(kind) {

    if (this.state.edit == 'Play') {
      gameArray = [];
      var sth = kind == 'random' ? 0.5 : 1;
      for (var i = 0; i < gameWidth; i++) {
        var arr = [];
        for (var j = 0; j < gameHeight; j++) {
          //  var ran = Math.random()>0.5 ? 'd':'a'
          arr.push(Math.random() > sth ? 'a' : 'd');
        }
        gameArray.push(arr);
      }
      if (kind == 'random') {
        this.setState({ touch: this.state.touch + 1 });
      } else if (kind == 'reset') {
        this.setState({ counter: 0 });
      }
    }
  };
  //stops or starts game

  Run.prototype.switcher = function switcher() {
    var _this2 = this;

    if (this.state.edit == 'Play') {
      playingGame = setInterval(function () {
        _this2.setState({ counter: _this2.state.counter + 1
        });
        /*if(this.state.edit=='Play'){
         clearInterval(playingGame); 
        }*/
      }, gameSpeed);
    } else if (this.state.edit == 'Stop') {

      clearInterval(playingGame);
    }
    this.setState({
      edit: this.state.edit == 'Stop' ? 'Play' : 'Stop'
    });
  };

  Run.prototype.Counter = function Counter() {

    this.setState({
      counter: this.state.counter + 1
    });
  };

  Run.prototype.render = function render() {
    var _this3 = this;

    //console.log(gameArray[-1]);

    if (this.state.edit == 'Play') {
      var y = -1;
      var ret = gameArray.map(function (items) {
        //console.log(items);    
        var x = -1;
        y++;

        return React.createElement(
          'div',
          { className: 'block-now' },
          items.map(function (item) {
            // console.log(y,x,item);
            x++;
            return React.createElement('div', { onClick: function onClick(event) {
                return _this3.test2(event);
              }, id: y.toString() + ',' + x.toString(), className: item });
          })
        );
      });
    } else {
      var counte = 0;
      var yb = 0;
      gameArray.map(function (items) {
        var xb = 0;
        items.map(function (item) {
          var other = item == 'd' ? 'a' : 'd';
          var count = 0;
          var lessY = yb - 1;
          var greatY = yb + 1;
          var lessX = xb - 1;
          var greatX = xb + 1;

          if (greatX == gameHeight) {
            greatX = 0;
          }
          if (greatY == gameWidth) {
            greatY = 0;
          }

          if (lessX == -1) {
            lessX = gameHeight - 1;
          }if (lessY == -1) {
            lessY = gameWidth - 1;
          }

          if (item == 'a' || item == 'p') {
            counte++;
          }

          if (gameArray[lessY][xb] == 'a' || gameArray[lessY][xb] == 'b') {
            count++;
          }if (gameArray[lessY][greatX] == 'a' || gameArray[lessY][greatX] == 'b') {
            count++;
          }if (gameArray[lessY][lessX] == 'a' || gameArray[lessY][lessX] == 'b') {
            count++;
          }if (gameArray[yb][lessX] == 'a' || gameArray[yb][lessX] == 'b') {
            count++;
          }if (gameArray[yb][greatX] == 'a' || gameArray[yb][greatX] == 'b') {
            count++;
          }if (gameArray[greatY][lessX] == 'a' || gameArray[greatY][lessX] == 'b') {
            count++;
          }if (gameArray[greatY][xb] == 'a' || gameArray[greatY][xb] == 'b') {
            count++;
          }if (gameArray[greatY][greatX] == 'a' || gameArray[greatY][greatX] == 'b') {
            count++;
          }

          if (item == 'd' && count == 3) {
            gameArray[yb][xb] = 'p';
          } else if (item == 'a') {
            if (count < 2 || count > 3) {
              //console.log(xa ,ya , count);
              gameArray[yb][xb] = 'b';
            }
          }
          xb++;
        });
        yb++;
      });

      //console.log(gameArray);
      var y = -1;

      var ret = gameArray.map(function (items) {
        //console.log(items);    
        var x = -1;
        y++;

        return React.createElement(
          'div',
          { className: 'block-now' },
          items.map(function (item) {
            // console.log(y,x,item);
            x++;
            if (item == 'b') {
              gameArray[y][x] = 'd';
              item = 'd';
            } else if (item == 'p') {
              gameArray[y][x] = 'a';
              item = 'a';
            }
            return React.createElement('div', { onClick: function onClick(event) {
                return _this3.test2(event);
              }, id: y.toString() + ',' + x.toString(), className: item });
          })
        );
      });
      if (counte == 0) {
        this.switcher();
      }
    }

    //console.log(ret);
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'block-now but' },
        React.createElement(
          'button',
          { onClick: function onClick() {
              return _this3.switcher();
            }, className: 'btn btn-primary' },
          this.state.edit
        ),
        React.createElement(
          'button',
          { className: 'btn btn-primary', onClick: function onClick() {
              return _this3.randomize('random');
            } },
          'Random'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-primary', onClick: function onClick() {
              return _this3.randomize('reset');
            } },
          'Reset'
        )
      ),
      React.createElement(
        'div',
        { style: { float: 'left', display: 'inline', fontSize: '20px' } },
        React.createElement(
          'div',
          null,
          'Speed : ' + speedName
        ),
        React.createElement(
          'div',
          null,
          'Generations : ' + this.state.counter
        ),
        React.createElement(
          'div',
          null,
          'Size : ' + sizeName
        )
      ),
      React.createElement(
        'div',
        { className: 'game-play' },
        ret
      ),
      React.createElement(
        'div',
        { className: 'block-now but' },
        React.createElement(
          'p',
          { className: 'foot' },
          'Size : ' + sizeName,
          ' '
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.sizeChanger(15, 15, event);
            }, className: 'btn btn-primary' },
          'Small'
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.sizeChanger(30, 30, event);
            }, className: 'btn btn-primary' },
          'Medium'
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.sizeChanger(50, 50, event);
            }, className: 'btn btn-primary' },
          'Large'
        )
      ),
      React.createElement(
        'div',
        { className: 'block-now but' },
        React.createElement(
          'p',
          { className: 'foot' },
          'Speed : ' + speedName
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.speedChanger(1000, event);
            }, className: 'btn btn-primary' },
          'Slow'
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.speedChanger(100, event);
            }, className: 'btn btn-primary' },
          'Medium'
        ),
        React.createElement(
          'button',
          { onClick: function onClick(event) {
              return _this3.speedChanger(50, event);
            }, className: 'btn btn-primary' },
          'Fast'
        )
      )
    );
  };

  return Run;
}(React.Component);

ReactDOM.render(React.createElement(Run, null), document.querySelector('.render-one'));