set -o errexit

npm ci --include=dev
npm run build
npx prisma generate 
npx prisma migrate deploy
