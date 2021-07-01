'use strikt'
function Main(){
    
    Vue.config.devtools = true;
    
    let app = new Vue({
        el: '#game',
        data(){
             return   {
                 
                 level:  "normal",
                 easy:   { name: 'easy',   time: 1.5 },
                 normal: { name: 'normal', time: 1   },
                 hard:   { name: 'hard',   time: 0.4 },
                 current_level: 1,   //хранит время текущего уровня сложности
                 round: 0,
                 quarter_array: [],         //хранит последовательность четвертей
                 user_array: [],            //хранит последовательность кликов пользователя
                 
                 blue: {
                     audio: 'https://zvukhub.ru/upload/iblock/335/335b98334148f16f43d9add396804f79.mp3',
                     name: 'blue',
                 },
                 
                 red: {
                     audio: 'https://zvukhub.ru/upload/iblock/744/744ab0ae98528ae66318d066d1348613.mp3',
                     name: 'red',
                 },
                 
                 yellow: {
                     audio: 'https://zvukhub.ru/upload/iblock/584/584050e2039c17ed4f24e976a7c08caf.mp3',
                     name: 'yellow',
                 },
                 
                 green: {
                     audio: 'https://zvukhub.ru/upload/iblock/3b4/3b442e083eebc0f9e3fb69ff9413a44a.mp3',
                     name: 'green',
                 },
            }
        },
        
       methods: { 
           focus_on( el ){
               el.target.classList.add( 'active');
           //    console.log( el.target.id );
           },
           
           focus_off( el ){
               el.target.classList.remove( 'active');
          //     console.log( el.target.id );
           },
           
           new_game(){
               this.break_game();
               document.getElementById( 'message' ).innerHTML = '';
               this.round = 1;
               this.game_set();
            //   this.active( this.random_quarter() );
           },   //начинает новую игру
           
           game_set(){
               
               if( !this.quarter_array ){
                   this.quarter_array[0] = this.random_quarter();
                   
                  } else{
                          this.quarter_array.push( this.random_quarter() );
                      }
               
               let active = this.active;    //псевдонимы
               let time = this.current_level;
               let not_click = this.not_click;
               
               this.quarter_array.forEach( function( item, i, arr){
                   setTimeout( ()=>{
                       active( item );
                       
                   }, time * (1000 * ( i + 1)) );
               });
               
               
           },   //формирует последовательность активных четвертей
           
           random_quarter(){
               let arr = [ "blue", "red", "yellow", "green" ];
               return arr[ Math.floor( Math.random() * 4 ) ];
           },   //выбирает случайную четверть
           
           define_current_level( str ){
               switch( str ){
                   case this.easy.name:
                       this.current_level = this.easy.time;
                       break;
                       
                   case this.normal.name:
                       this.current_level = this.normal.time;
                       break;
                       
                   case this.hard.name:
                       this.current_level = this.hard.time;
                       break;
                       
               }
           },   //определяет время текущего уровня сложности
           
           active( str ){
               let act = document.getElementById( str );
               
               this.audio( act.id );
               
               act.classList.add( 'fire');
               
               this.define_current_level( this.level );
               
               setTimeout( () => {
                   act.classList.remove( 'fire');
                   
               }, this.current_level * 1000);
           },   //делает четверть активной
           
           break_game(){
               
               let message = 'Вы проиграли, количество пройденных раундов: ' + this.round;
               
               this.round = 0;
               this.quarter_array = [];   
               this.user_array = [];
               
               document.getElementById( 'message' ).innerHTML = message;
           },   //ставит все значения в начальное положение и выводит сообщение о конце игры
           
           audio_click( e ){
               
               let id = e.target.id;
               this.audio( id );
               
               if( this.round ){
                   console.log( !this.user_array[0] );
                   if( !this.user_array[0] ){
                        this.user_array[0] = id;
                       
                       
                      } else{
                          this.user_array.push( id );
                      }
                   
                   
                   let quarter = this.quarter_array;    //псевдонимы
                   let user = this.user_array;
                   
                   console.log( quarter.length );
                   console.log( user.length );
                   
                   this.demonstration();
               
                   
                   if( quarter.length == user.length ){
                       if( quarter[ quarter.length -1] == user[ user.length -1 ] ){
                           
                                this.round++;
                                this.user_array = []; //обнуляет пользовательский массив
                                let game_set = this.game_set;
                           
                                setTimeout( ()=>{
                                    game_set();
                                }, 1000);
                           
                            } else{
                                this.break_game();
                            }
                       
                   }    else{
                       if( quarter.length > user.length ){
                           if( quarter[ user.length -1 ] !== user[ user.length -1 ] ){
                               this.break_game();
                           }
                       }    else{
                             this.break_game();
                        }
                   }
                    
                 }  //логика если игра началась
               
               
               
           },   //звук при клике на четверти, и заполняет пользовательский массив
           
           audio( str ){
               
               if( str == "blue"){
                   new Audio( this.blue.audio ).play();
               }
               
               if( str == "red" ){
                   new Audio( this.red.audio ).play();
               }
               
               if( str == "yellow" ){
                   new Audio( this.yellow.audio ).play();
               }
               
               if( str == "green" ){
                   new Audio( this.green.audio ).play();
               }
           },   //запускает соответствующий звук по имени четверти
           
           demonstration(){
               
               console.log( '----==========-=-=-=-=-=' );
               
               let user = this.user_array;
               
             this.quarter_array.forEach( (el, i )=>{
                 console.log( el + ' ' + i + '___ user: ' + user[i]);
             });
               
               console.log( '\n\n' );
      /*         
            this.user_array.forEach( (el, i )=>{
                console.log( el + ' ' + i );
            })
       */        
         //  console.log( '----==========-=-=-=-=-=' );
               
           },   //метод показывающий массивы (для отладки)
           
       },
        
    });
    
    
    
    
    
}

window.onload = Main;