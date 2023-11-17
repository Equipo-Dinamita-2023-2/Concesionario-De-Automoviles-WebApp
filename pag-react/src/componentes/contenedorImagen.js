<<<<<<< HEAD


=======
>>>>>>> CDAW-72-CDA2-78-CDAW84
const ContenedorConImagen = ({ imagen }) => {
    const estiloContenedor = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
<<<<<<< HEAD
        height: '480px', // Ajusta la altura según tus necesidades
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
=======
        height: '400px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
>>>>>>> CDAW-72-CDA2-78-CDAW84
    };
    return (
    <div style={estiloContenedor}></div>
    );
};


export default ContenedorConImagen;