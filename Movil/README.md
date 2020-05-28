## Funcionamiento

### 1. Crea un UUID único para el dispositivo y lo guarda en la aplicación registrando en la BD automáticamente en `Devices`.
- El dispositivo tiene 2 atributos: UUID, table.
- La UUID del dispositivo es aleatorio y se guarda en el almacenamiento del dispositivo.
- Si se elimina el dispositivo de la BD, aparece un diálogo que pide que registre el dispositivo y toma la UUID que está almacenado en el dispositivo para registrarlo de nuevo.
- Al registrar en la BD el dispositivo, se asigna por defecto la mesa **0**, que significa que no tiene ninguna mesa asignada.

### 2. Se presionará el botón **Iniciar** para registrar al consumidor en `Users -> Consumers`.
- Por ahora el consumidor es **Test**, así que se registra con ese nombre.
- Si no está asignado a una mesa el dispositivo, aparece un diálogo que dice que el dispositivo no tiene asginado una mesa.
- Si no está registrado a una mesa el dispositivo se tiene que cambiar el atributo **table** del dispositivo por un número entero mayor a 0, directamente de la BD.
####    NOTA: si el atributo **table** del dispositivo es **0** significa que el dispositivo no está asignado a ninguna mesa.

### 5. Cuando ya esté registrado el dispositivo y tenga asignado una mesa se tiene que presionar el botón **Iniciar** para registrar al consumidor.
- El consumidor tiene 3 atributos: UUID, name, table.
- El consumidor se registrará con un UUID random, el nombre por ahora es **Test** y la mesa es asignada obteniendo la mesa asignada del dispositivo.