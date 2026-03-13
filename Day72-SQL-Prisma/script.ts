const userWithPosts = await prisma.user.findUnique({
  where: { email: 'aryan@example.com' },
  include: {
    posts: {
      take: 5,
      orderBy: { id: 'desc' }
    }
  }
});