export const permiso = (permiso) =>{
    return (req, res, next) =>{

        if(req.user?.role !== permiso){
            res.setHeader('Content-Type','application/json');
            return res.status(403).json({error:`No tiene privilegios suficientes para acceder al recuros solicitado`});
        }

        next()
    }
}