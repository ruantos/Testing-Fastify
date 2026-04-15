export async function checkSessionId(request, reply) {
    const sessionId = request.cookies.sessionId;
    if (!sessionId) {
        reply.status(401).send({
            error: "Unauthorized access!"
        });
        return;
    }
}
