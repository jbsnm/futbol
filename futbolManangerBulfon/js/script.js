// Función para obtener los jugadores del localStorage
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores');
    return jugadoresString ? JSON.parse(jugadoresString) : [];
};

// Función para guardar los jugadores en el localStorage
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función asíncrona para agregar un nuevo jugador al equipo usando un prompt de HTML
const agregarJugador = async () => {
    try {
        // Solicitar al usuario que ingrese los datos del jugador
        const nombre = prompt("Ingrese el nombre del jugador:");
        const edad = parseInt(prompt("Ingrese la edad del jugador:"));
        const posicion = prompt("Ingrese la posición del jugador:");
        const titularidad = prompt("Ingrese si el jugador está como titular o suplente");

        // Obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();

        // Verificar si el jugador ya existe en el equipo
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre);
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.');
        }

        // Agregar el nuevo jugador al array de jugadores
        jugadores.push({ nombre, edad, posicion, titularidad });

        // Guardar los jugadores actualizados en el localStorage
        guardarJugadoresLocalStorage(jugadores);

        // Simular una demora de 1 segundo para la operación asíncrona
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mostrar un mensaje de éxito
        alert('Jugador agregado correctamente.');

        await listarJugadores();
    } catch (error) {
        console.error('Error:', error.message);
    }
};


// Función asíncrona para listar todos los jugadores del equipo
const listarJugadores = async () => {
    try {
        //obtener los jugadores del localStorage
        let jugadores = obtenerJugadoresLocalStorage();
        //condicion para mostrar la lista si es que está vacía
        if (jugadores.length === 0 ) {
            console.log('No hay jugadores en la lista');
            return;
        }

        const titularesElement = document.getElementById('titulares');
        const suplentesElement = document.getElementById('suplentes');
        
        titularesElement.innerHTML = '';
        suplentesElement.innerHTML = '';
      //recorre la lista de jugadores, devuelve un listado con sus caracteristicas
        jugadores.forEach(jugador => {
            const jugadorItem = document.createElement('li');
            jugadorItem.textContent = `${jugador.nombre}, ${jugador.edad} años, ${jugador.posicion}.`;
            
            if (jugador.titularidad === 'titular'){
                titularesElement.appendChild(jugadorItem);
            } else if (jugador.titularidad === 'suplente') {
                suplentesElement.appendChild(jugadorItem);
            }
        });

        console.log('Lista de jugadores actualizada');
        
        } catch (error) {
            console.error('Error:', error.message);
        }
};
document.addEventListener('DOMContentLoaded', listarJugadores);


        

// Función asíncrona para asignar una nueva posición a un jugador
const asignarPosicion = async () => {
    // Implementación para asignar una nueva posición a un jugador
    try {
    // SOlicitar al usuario los datos que quiere modificar
    const nombreJugador = prompt("Ingrese el nombre del jugador para reasignarle la posición:");
    const nuevaPosicion = prompt("Ingrese la nueva posición del jugador:");

    //obtener los jugadores del localStorage

    let jugadores = obtenerJugadoresLocalStorage();

    //verificar si el jugador existe en el localStorage y sino, tirar un error

    const jugador = jugadores.find(jugador => jugador.nombre === nombreJugador);
    if (!jugador) {
        throw new Error ('Jugador no encontrado');
    }

    //asignar una nueva posición

    jugador.posicion = nuevaPosicion;

    guardarJugadoresLocalStorage(jugadores);

    await new Promise(resolve => setTimeout(resolve, 1000));

    alert("La posición del jugador ha sido reasignada");

    listarJugadores();
} catch (error) {
    console.error('Error:', error.message);
}

};

// Función asíncrona para realizar un cambio durante un partido
const realizarCambio = async (jugadorEntrante, jugadorSaliente) => {
    // Implementación para realizar un cambio durante un partido
    try {
        const jugadorTitular = prompt("Ingrese el jugador titular que quiere sacar:");
        const jugadorSuplente = prompt("Ingrese el jugador suplente que quiere ingresar:");
    

        let jugadores = obtenerJugadoresLocalStorage();

        const titular = jugadores.find( jugador => jugador.nombre === jugadorTitular && jugador.titularidad === 'titular');
        const suplente = jugadores.find(jugador => jugador.nombre === jugadorSuplente && jugador.titularidad === 'suplente');

        if (!titular) {
        throw new Error('Jugador titular no existe.');
        }

        if (!suplente) {
        throw new Error('Jugador suplente no existe.');
        }

        titular.titularidad = 'suplente';
        suplente.titularidad = 'titular';

        guardarJugadoresLocalStorage(jugadores);

        await new Promise(resolve => setTimeout(resolve, 1000));

        alert('Cambio realizado.');

        listarJugadores();

    } catch(error) {
    console.error('Error:', error.message);
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    try {
        // Lógica para interactuar con el usuario y llamar a las funciones adecuadas
    } catch (error) {
        console.error('Error:', error);
    }
};

// Llamar a la función principal para iniciar la aplicación
main();
