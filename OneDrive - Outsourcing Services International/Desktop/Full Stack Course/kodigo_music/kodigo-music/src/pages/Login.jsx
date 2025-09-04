//importar state
import { useState } from "react";
//importar hook de autenticacion
import { useAuth } from "../contexts/AuthContext";
//importar useNavigate
import { useNavigate } from "react-router-dom";
//importar estilos
import "../styles/Login.css";

const Login = () => {
    //estados para el formulario
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    //error state
    const [errors, setErrors] = useState({});
    //loading state
    const [loading, setLoading] = useState(false);

    //llamar funciones de autenticacion
    const { login, signup } = useAuth();
    //llamar useNavigate
    const navigate = useNavigate();

    //funcion para manejar cambios en el formulario
    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "El correo no es valido";
        }
        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (formData.password.length < 6) {
            newErrors.password = "La contraseña debe tener al menos 6 caracteres";
        }

        if (!isLogin) {
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = "Las contraseñas no coinciden";
            }
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            setErrors({});
            setLoading(true);

            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await signup(formData.email, formData.password);
            }

            navigate("/");
        } catch (error) {
            setErrors({ firebase: error.message });
        }

        setLoading(false);
    };

    //funcion para manejar cambios en los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    //vista del componente(Login y Registro)
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className='login-form'>
                <h2>{isLogin ? 'Iniciar Sesion' : 'Registrarse'} </h2>

                {errors.firebase && <p className="error">{errors.firebase}</p>}

                {/* validar info del email llamando errores del estado */}
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                </div>

                {/* validar info de la password llamando errores del estado */}
                <div className="form-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? 'error' : ''}
                    />
                    {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                {!isLogin && (
                    <div className="form-group">
                        <label>Confirmar Contraseña</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className={errors.confirmPassword ? 'error' : ''}
                        />
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                )}

                {/* Botones de envio y cambio de formulario */}
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesion' : 'Registrarse')}
                </button>

                <div className="toggle-form">
                    <p>
                        {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                        <span
                            className="toggle-link"
                            style={{ cursor: "pointer", marginLeft: "8px" }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? 'Registrate' : 'Inicia Sesion'}
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;





