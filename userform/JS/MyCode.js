'use strikt'
function Main(){
    
    Vue.config.devtools = true;
    
    let app = new Vue({
        el: '#form',
        data(){
             return   {
            mustoptions: ['VIP', 'Проблемные', 'ОМС'], 
            doctors: ['Иванов', 'Захаров', 'Чернышева'], 
            docs: ['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение'],
            
            surename:       null,     //must
            name:           null,     //must
            patronymic :    null,
            borndate:       null,     //must
            phonenumber:    null,     //must
            sex:            null,
            mustoption:     [],     //must
            index:          null,
            country:        null,
            area:           null,
            city:           null,     //must
            street:         null,
            home:           null,
            chekSMS:      false, 
            doctor:      'Иванов',
            doc:         'Паспорт',     //must
            seria:          null,
            number:         null,
            distributer:    null, 
            date:           null,      //must
            
           
            }
        },
        
       methods: { 
            send(){
                
               let valid = true;
                
                if( !this.surename ){
                        this.errorMessage('Заполните поле Фамилия!');
                        valid = false;
                    
                    } else{
                        
                        if( !this.name){
                            this.errorMessage('Заполните поле Имя!');
                            valid = false;
                            
                             }else{
                                 
                                if( !this.borndate){
                                    this.errorMessage('Заполните поле дата рождения!');
                                    valid = false;
                             } else{
                                 
                                 if( !this.phonenumber){
                                     this.errorMessage('Заполните поле номер телефона!');
                                     valid = false;

                                 }else{
                                     
                                     let re = /^\d[\d]{9}\d$/;
                                     if( !re.test(this.phonenumber) ){
                                         this.errorMessage('Введите номер телефона в правильном формате (без пробелов и других знаков)!');
                                         valid = false;
                                     }
                                     
                                     if( !this.mustoption[ 0 ] ){
                                         this.errorMessage('Выберите значение Группа клиентов!');
                                         valid = false;

                                     }else{
                                         
                                         if( !this.city ){
                                            this.errorMessage('Выберите значение Город!');
                                            valid = false;
                                             
                                            }else{
                                                
                                             if( !this.doc ){
                                                this.errorMessage('Выберите тип документа!');
                                                valid = false;
                                            }else{
                                                
                                             if( !this.date ){
                                                this.errorMessage('Выберите дату выдачи!');
                                                valid = false;
                                             }
                                        }
                                     }
                                 }
                             }
                        }
                    }
                }
                  
                
                if( valid){
                    alert( 'Форма заполненна правильно!');
                    this.errorMessage('');
                  //  document.getElementById( 'form' ).submit();
                }
                
            },
           
            clearNumber(){
                if( this.phonenumber == null) this.phonenumber = '7';
            },
           
           errorMessage( str ){
               document.getElementById( 'errorMessage' ).innerHTML = ( str ).toUpperCase();
           },
           
           
           
       },
        
    });
    
    
    
    
    
}

window.onload = Main;