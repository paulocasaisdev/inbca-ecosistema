import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY!; // Chave mestra fornecida no log

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@casinhaamarela.com.br';
  const password = 'AdminInbc2026!';

  console.log('Criando usuário Admin...');

  const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email: email,
    password: password,
    email_confirm: true,
    user_metadata: { nome: 'Administrador INBCA' }
  });

  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('Usuário já existe no Supabase. Buscando lista...');
      const { data } = await supabaseAdmin.auth.admin.listUsers();
      const existingUser = data.users.find(u => u.email === email);
      if (existingUser) {
        console.log('Encontrado:', existingUser.id);
        await criarNoPrisma(existingUser.id, email);
      }
    } else {
      console.error('Erro Supabase:', authError);
    }
    return;
  }

  if (authData?.user?.id) {
    console.log(`Supabase Auth Criado: ${authData.user.id}`);
    await criarNoPrisma(authData.user.id, email);
  }
}

async function criarNoPrisma(id: string, email: string) {
  const usuario = await prisma.usuario.upsert({
    where: { email: email },
    update: { role: 'ADMIN', nome: 'Administrador INBCA', id: id },
    create: { id: id, email: email, nome: 'Administrador INBCA', role: 'ADMIN' }
  });
  console.log('Prisma Usuario criado/atualizado:', usuario);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
