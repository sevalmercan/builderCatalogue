# builderCatalogue

Builder Catalogue Challenge
In our digital offerings we have a database of building sets that can be constructed by our fans, and we have a related service where users can record their inventories of building pieces digitally to track and compare their collections.

We now have a need for a service that lets our fans explore their existing collections and assess what sets can be built from the pieces that they already own.

Your Task
Your task is to answer the following question:

Which sets can the user brickfan35 build with their exisiting inventory of pieces?
We expect you to write some code to answer this and be prepared to do a code review with us during your interview. Use whichever language, platform or approach you best feels demostrates your abilities.

Concepts
A piece is defined by a piece id (sometimes called a designId) that identifies the form the piece takes, for example "3023" for a 1 x 2 Plate, and a colour code (sometimes referred to as the material id).

A set is comprised of a collection of pieces and may have pieces that occur more than once and also appear in different colours. To build a complete set you need all of the pieces listed in the correct quantities and colours. For example a set may consist of:

4 x part number 3023 in blue
2 x part number 4286 in red
1 x part number 4286 in white
Our users also track which pieces they own in an inventory system. We have a number of API endpoints that expose both the sets that can be built and their piece requirements, and the users' current inventories.

Available APIs
An API is hosted at this domain and provides the following endpoints:

/api/users returns a list of users in the catalogue

/api/user/by-username/{username} returns a summary of a single user

/api/user/by-id/{id} return the full data for a single user

/api/sets returns a list of the sets in the catalogue

/api/set/by-name/{name} returns a summary of a single set

/api/set/by-id/{id} returns the full data for a single set

/api/colours returns the full list of colours available

Stretch goals
These are not neccesary to complete, but feel free to extend your solution to help these users:

The user landscape-artist doesn't have the right pieces to build the set tropical-island but would like to collaborate with other users on the build. Which users could they combine their collection with to have the complete piece requirements for the build?

The user megabuilder99 is interested in creating a new custom build but they want to make sure other people could complete it with their current inventories. What is the largest collection of pieces they should restrict themselves to if they want to ensure that at least 50% of other users could complete the build?

(HARD) The user dr_crocodile wants to expand the number of sets they can build with their current inventory and are prepared to be flexible on the colour scheme. They are happy to substitute any colour in a set as long as all the pieces of that colour are substituted, and that the new colour isn't used elsewhere in the set. For example, a building with white walls, a red roof and a green flag could be built with red walls, a blue roof and a green flag. What new sets can dr_crocodile build by allowing colour substitutions?
