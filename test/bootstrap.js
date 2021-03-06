'use strict';

require('dotenv').config();

let ORM = require('../index');

let {
	BaseCollection,
	BaseModel,
	Table
} = new ORM({
	dbUrl: process.env.TEST_DB_URL,
	live: false
});

let userTable = new Table('users', {
	user_id: {
		type: 'integer',
		isPrimaryKey: true
	},
	name: {
		type: 'text'
	},
	team_id: {
		type: 'integer'
	},
	created_at: {
		type: 'timestamp with time zone'
	},
	metadata: {
		type: 'jsonb'
	}
});

class User extends BaseModel {
	greet() {
		return `Hello, ${this.name}`;
	}

	static get table() {
		return userTable;
	}

	static get fieldMap() {
		return {
			userId: 'user_id',
			teamId: 'team_id',
			name: 'name',
			createdAt: 'created_at',
			metadata: 'metadata'
		};
	}
}

class UserCollection extends BaseCollection {
	static get associatedClass() {
		return User;
	}
}

let teamTable = new Table('teams', {
	team_id: {
		type: 'integer',
		isPrimaryKey: true
	},
	name: {
		type: 'string'
	},
	owner_id: {
		type: 'integer'
	}
});

class Team extends BaseModel {
	cheer() {
		console.log(`Go ${this.name}!`);
	}

	static get table() {
		return teamTable;
	}

	static get fieldMap() {
		return {
			teamId: 'team_id',
			name: 'name',
			ownerId: 'owner_id'
		};
	}
}

class TeamCollection extends BaseCollection {
	static get associatedClass() {
		return Team;
	}
}

let gameTable = new Table('games', {
	game_id: {
		type: 'integer',
		isPrimaryKey: true
	},
	date: {
		type: 'date'
	}
});

class Game extends BaseModel {
	static get table() {
		return gameTable;
	}

	static get fieldMap() {
		return {
			gameId: 'game_id',
			date: 'date',
			winner: 'winner',
			valid: 'valid'
		};
	}
}

class GameCollection extends BaseCollection {
	static get associatedClass() {
		return Game;
	}
}

User.belongsTo(Team, {
	key: 'teamId',
	references: 'teamId'
}, 'team')

module.exports = {
	User,
	UserCollection,
	Team,
	TeamCollection,
	GameCollection,
	Game,
	Table,
	BaseCollection
}
