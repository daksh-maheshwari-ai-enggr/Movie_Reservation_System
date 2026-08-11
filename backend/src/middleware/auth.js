import jwt from 'jsonwebtoken';
export const auth=(req,res,next)=>{try{const token=req.headers.authorization?.split(' ')[1]; req.user=jwt.verify(token,process.env.JWT_SECRET);next()}catch{res.status(401).json({message:'Authentication required'})}};
export const admin=(req,res,next)=>req.user?.role==='ADMIN'?next():res.status(403).json({message:'Administrator access required'});
