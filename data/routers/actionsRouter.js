const express = require('express')

const Actions = require('../helpers/actionModel')

const router = express.Router()

// GET all actions for specific project 🚀
router.get('/', validateActions, async (req, res) => {
  try {
    const actions= await Actions.get(req.params.id)
    res.status(200).json(actions)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the actions 💩'
    })
  }
})

// GET a specific action for the chosen project 🍒
router.get('/:id', validateActionId, async (req, res) => {
  try {
    const action = await Actions.get(req.params.id)
    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).json({
        message: 'The action you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the action 💩'
    })
  }
})

// POST a new action to your chosen project 🚼
router.post('/', validateActionContent, async (req, res) => {
  try {
    const action = await Actions.insert(req.body)
    res.status(201).json(action)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not add the action 💩'
    })
  }
})

// DELETE an existing action for your chosen project ☠️
router.delete('/:id', validateActionId, async (req, res) => {
  try {
    const count = await Actions.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({
        message: 'This action has been deleted ☠️'
      })
    } else {
      rex.status(404).json({
        message: 'The action you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not delete the action 💩'
    })
  }
})

// PUT to update an existing action in your chosen project 👨‍💻
router.put('/:id', validateActionId, validateActionContent, async (req, res) => {
  try {
    const action = await Actions.update(req.params.id, req.body)
    if (action) {
      res.status(200).json(action)
    } else {
      res.status(404).json({
        message: 'The action you are trying to update could not be found 🤷'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the action 💩'
    })
  }
})

/* 🔥 Custom middleware 🔥 */

// Validates all the actions for your /GET request 🌎
function validateActions(req, res, next) {
  try {
    const action = req.body
    if (action) {
      console.log('Action validation success')
      next()
    } else {
      res.status(400).json({
        message: 'Could not /GET request 💩'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// Validates the ID of your /GET request 🆔
async function validateActionId(req, res, next) {
  try {
    const { id } = req.params
    const action = await Actions.get(id)
    if (action) {
      console.log('Action validation success')
      console.log(req.params)
      req.action = action
      next()
    } else {
      res.status(404).json({
        message: 'The action you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

/* Validates you have entered a project_id, description, notes and
completed status for your action /PUT's and /POST's 👓 */
function validateActionContent(req, res, next) {
  try {
    const action = req.body
    if (action.project_id || action.description || action.notes || action.completed) {
      console.log('Action content validation success')
      next()
    } else {
      res.status(400).json({
        message: 'Could not /POST request 💩'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = router