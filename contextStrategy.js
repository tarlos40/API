const Icrud = require('./crud.js')

class ContextStrategy extends Icrud {
    constructor(strategy) {
        super()
        this.strategy = strategy
}
    isConnected(item) {
        return this.strategy.isConnected(item)
    }
    create(item) {
        return this.strategy.create(item)
    }
    read(item) {
        return this.strategy.read(item ? item : {})
    }
    update(filter, item) {
        return this.strategy.update(filter, item)
    }
    delete(item) {
        return this.strategy.delete(item)
    }

    async send(senderId, recipientId, Message, expirationTime) {
        return await this.strategy.send(senderId, recipientId, Message, expirationTime);
    }
}

module.exports = ContextStrategy