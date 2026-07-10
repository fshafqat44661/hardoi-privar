import mongoose from 'mongoose';

const uris = {
  standard:
    'mongodb://fshafqat44661_db_user:87654321@ac-2ws6z0m-shard-00-00.cqs7iq6.mongodb.net:27017,ac-2ws6z0m-shard-00-01.cqs7iq6.mongodb.net:27017,ac-2ws6z0m-shard-00-02.cqs7iq6.mongodb.net:27017/hardoi-parivar?ssl=true&replicaSet=atlas-kaihuw-shard-0&authSource=admin&appName=Cluster0',
  srv: 'mongodb+srv://fshafqat44661_db_user:87654321@cluster0.cqs7iq6.mongodb.net/hardoi-parivar?retryWrites=true&w=majority&appName=Cluster0',
};

async function test(label: string, uri: string) {
  const safe = uri.replace(/:[^:@]+@/, ':****@');
  console.log(`\n--- ${label} ---\n${safe}`);
  const started = Date.now();
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 15000 });
    const ping = await mongoose.connection.db?.admin().ping();
    console.log(`OK in ${Date.now() - started}ms`, ping);
    await mongoose.disconnect();
    return true;
  } catch (err) {
    const e = err as Error;
    console.error(`FAIL in ${Date.now() - started}ms:`, e.name, e.message);
    await mongoose.disconnect().catch(() => undefined);
    return false;
  }
}

async function main() {
  const standardOk = await test('standard', uris.standard);
  const srvOk = await test('srv', uris.srv);
  process.exit(standardOk || srvOk ? 0 : 1);
}

main();
