try {
  await fetch('http://localhost:3000')
  console.log('rebuilt')
}
catch (error) {
  console.error('Error fetching localhost:3000...is it running?')
  process.exit(1)
}
