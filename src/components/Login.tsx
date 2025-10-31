import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Leaf } from 'lucide-react';

interface LoginProps {
  onLogin: (username: string, token: string) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!loginUsername || !loginPassword) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }
  const API = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000';

    const form = new FormData();
    form.append('username', loginUsername);
    form.append('password', loginPassword);

    (async () => {
      try {
        const res = await fetch(`${API}/login`, { method: 'POST', body: form });
        const text = await res.text();
        let data: any = null;
        try { data = JSON.parse(text); } catch { /* not JSON */ }
        if (!res.ok) {
          const msg = (data && data.detail) || text || 'Error en login';
          throw new Error(msg);
        }
        const token = data?.access_token;
        if (!token) throw new Error('No se recibió token');
        onLogin(loginUsername, token);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Usuario o contraseña incorrectos');
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!registerUsername || !registerPassword || !registerEmail) {
      setError('Por favor completa todos los campos');
      setLoading(false);
      return;
    }
  const API = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000';

    const form = new FormData();
    form.append('username', registerUsername);
    form.append('password', registerPassword);
  form.append('email', registerEmail);

    (async () => {
      try {
        const res = await fetch(`${API}/register`, { method: 'POST', body: form });
        const text = await res.text();
        let data: any = null;
        try { data = JSON.parse(text); } catch {}
        if (!res.ok) {
          const msg = (data && data.detail) || text || 'Error en registro';
          throw new Error(msg);
        }

        // Auto-login
        const lf = new FormData();
        lf.append('username', registerUsername);
        lf.append('password', registerPassword);
        const r2 = await fetch(`${API}/login`, { method: 'POST', body: lf });
        const t2 = await r2.text();
        let data2: any = null;
        try { data2 = JSON.parse(t2); } catch {}
        if (!r2.ok) {
          const msg = (data2 && data2.detail) || t2 || 'Login tras registro falló';
          throw new Error(msg);
        }
        const token = data2?.access_token;
        if (!token) throw new Error('No se recibió token');
        onLogin(registerUsername, token);
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'No se pudo crear la cuenta');
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <div className="size-full flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-green-800">EcoTracker</h1>
          <p className="text-muted-foreground">Monitorea tu huella de carbono</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Bienvenido</CardTitle>
                <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">Usuario</Label>
                    <Input
                      id="login-username"
                      value={loginUsername}
                      onChange={(e) => setLoginUsername(e.target.value)}
                      placeholder="Tu usuario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Contraseña</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Tu contraseña"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Procesando...' : 'Iniciar Sesión'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Crear Cuenta</CardTitle>
                <CardDescription>Regístrate para comenzar a reducir tu huella</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      value={registerEmail}
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Usuario</Label>
                    <Input
                      id="register-username"
                      value={registerUsername}
                      onChange={(e) => setRegisterUsername(e.target.value)}
                      placeholder="Elige un usuario"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Contraseña</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  {error && <p className="text-destructive text-sm">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Registrando...' : 'Crear Cuenta'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
