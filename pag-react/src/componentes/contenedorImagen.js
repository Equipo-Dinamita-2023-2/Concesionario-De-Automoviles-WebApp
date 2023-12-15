const ContenedorConImagen = ({ imagen }) => {
    const estiloContenedor = {
        backgroundImage: `url(${imagen})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '400px', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '150px',
    };
    return (
    <div style={estiloContenedor}></div>
    );
};


export default ContenedorConImagen;