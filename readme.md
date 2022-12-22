1. Запуск кластера з 3 нодами

    `docker-compose up --scale member=2`
2. Запустити скрипт за допомогою 
   
   `npm start`
3. Додати різнотипні ключі з допомогою cURL

   - string 
   
   `curl -X PUT localhost:8098/riak/test/name -d "Victor"`

   - number 
   
   `curl -X PUT localhost:8098/riak/test/age -d 32`

   - mime 
    
   `curl -X PUT localhost:8098/riak/test/christmass.webp -H "Content-type: image/jpeg" --data-binary @assets/christmass.webp`
   
   - view mime 
   
   `http://localhost:8098/riak/test/christmass.webp`

   - json 
   
   `curl -X POST localhost:8098/riak/employees/vic -H "Content-type: application/json" -d '{"name": "Victor", "role":"AI dev"}'`

   - json one more time 
   
   `curl -X POST localhost:8098/riak/employees/helen -H "Content-type: application/json" -d '{"name": "Helen", "role":"Game designer"}'`

4. Лінки
   
   - створимо департмент і додамо лінки на працівників
   
   `curl -X POST localhost:8098/riak/departments/rnd -H "Content-type: application/json" -H 'Link:</riak/employees/helen>;riaktag="contains",</riak/employees/vic>;riaktag="contains",</riak/employees/vic>;riaktag="techlead",' -d '{"fullName":"Research&Development"}'`
   
   - переглянемо створені лінки 
    
   `curl -v localhost:8098/riak/departments/rnd/_,_,_`

   - дістати інформації тільки про робітників департменту 
    
   `curl -v localhost:8098/riak/departments/rnd/employees,_,_`

   - дістати тільки техлідів 
    
   `curl localhost:8098/riak/departments/rnd/_,techlead,_`

   - додамо скіл для робітника 
   
   `curl -X POST localhost:8098/riak/skills/nodejs -H "Content-type: application/json" -d '{"level": 8}`

   - запишемо цей скіл одному з робітників 
    
   `curl -X PUT localhost:8098/riak/employees/vic -H "Content-type: application/json" -H 'Link:</riak/skills/nodejs>;riaktag="skills"' -d '{"name": "Victor", "role":"AI dev"}'`

   - і ще один скіл 
    
   `curl -X POST localhost:8098/riak/skills/english -H "Content-type: application/json" -d '{"level": 5}'`

   - запишемо іншому працівнику 
    
   `curl -X PUT localhost:8098/riak/employees/helen -H "Content-type: application/json" -H 'Link:</riak/skills/english>;riaktag="skills"' -d '{"name": "Helen", "role":"Game designer"}'`

   - дістанемо список робітників з їхніми скілами 
    
   `curl localhost:8098/riak/departments/rnd/_,_,1/_,_,_`


5. Map-reduce

   `curl -X PUT -H "Content-type:application/json" localhost:8098/riak/my_functions/map-marks --data @assets/map_marks.js`

    
