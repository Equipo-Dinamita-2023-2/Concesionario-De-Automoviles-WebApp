const ContenedorConImagen = ({ imagen }) => {
    const estiloContenedor = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '480px', // Ajusta la altura según tus necesidades
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };
    return (
    <div style={estiloContenedor}></div>
    );
};


export default ContenedorConImagen;