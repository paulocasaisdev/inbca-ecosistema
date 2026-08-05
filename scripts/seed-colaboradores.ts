import { createClient } from '@supabase/supabase-js';
import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) dotenv.config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SECRET_KEY!; 

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const prisma = new PrismaClient();

async function main() {
  const usersToCreate = [
    {
      nome: 'Itaimara',
      email: 'itaimara@casinhaamarela.com.br',
      password: 'Inbc2026!',
      role: 'RECEPCAO'
    },
    {
      nome: 'Maria Luiza',
      email: 'maria.luiza@casinhaamarela.com.br',
      password: 'Inbc2026!',
      role: 'RECEPCAO'
    }
  ];

  for (const user of usersToCreate) {
    console.log(`Criando usuário: ${user.nome}...`);

    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { nome: user.nome }
    });

    if (authError) {
      if (authError.message.includes('already registered')) {
        console.log(`Usuário ${user.nome} já existe no Supabase. Buscando id...`);
        const { data } = await supabaseAdmin.auth.admin.listUsers();
        const existingUser = data.users.find(u => u.email === user.email);
        if (existingUser) {
          console.log(`Encontrado: ${existingUser.id}`);
          await criarNoPrisma(existingUser.id, user.email, user.nome, user.role);
        }
      } else {
        console.error(`Erro Supabase ao criar ${user.nome}:`, authError);
      }
      continue;
    }

    if (authData?.user?.id) {
      console.log(`Supabase Auth Criado para ${user.nome}: ${authData.user.id}`);
      await criarNoPrisma(authData.user.id, user.email, user.nome, user.role);
    }
  }
}

async function criarNoPrisma(id: string, email: string, nome: string, role: string) {
  const usuario = await prisma.usuario.upsert({
    where: { email: email },
    update: { role: role as any, nome: nome, id: id },
    create: { id: id, email: email, nome: nome, role: role as any }
  });
  console.log(`Prisma Usuario criado/atualizado: ${nome}`, usuario);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
