const express = require('express')

const Projects = require('../helpers/projectModel')

const router = express.Router()

// GET all projects 🚀
router.get('/', validateProjectId, async (req, res) => {
  try {
    const projects= await Projects.get(req.params.id)
    res.status(200).json(projects)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the projects 💩'
    })
  }
})

// GET a specific project 🍒
router.get('/:id', validateProjectId, async (req, res) => {
  try {
    const project = await Projects.get(req.params.id)
    if (project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({
        message: 'The project you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not retrieve the project 💩'
    })
  }
})

// POST a new project 🚼
router.post('/', validateProjectContent, async (req, res) => {
  try {
    const project = await Projects.insert(req.body)
    res.status(201).json(project)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not add the project 💩'
    })
  }
})


// DELETE an existing project ☠️
router.delete('/:id', validateProjectId, async (req, res) => {
  try {
    const count = await Projects.remove(req.params.id)
    if (count > 0) {
      res.status(200).json({
        message: 'This project has been deleted ☠️'
      })
    } else {
      rex.status(404).json({
        message: 'The project you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not delete the project 💩'
    })
  }
})


// PUT to update an existing project 👨‍💻
router.put('/:id', validateProjectId, validateProjectContent, async (req, res) => {
  try {
    const project = await Projects.update(req.params.id, req.body)
    if (project) {
      res.status(200).json(project)
    } else {
      res.status(404).json({
        message: 'The project you are trying to update could not be found 🤷'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Could not update the project 💩'
    })
  }
})

/* 🔥 Custom middleware 🔥 */

// Validates the ID of your /GET request 🆔
async function validateProjectId(req, res, next) {
  try {
    const { id } = req.params
    const project = await Projects.get(id)
    if (project) {
      console.log('Project validation success')
      req.project = project
      next()
    } else {
      res.status(404).json({
        message: 'The project you are looking for could not be found 🤷‍'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({error})
  }
}

/* Validates new project /POST and /PUT has a name, description,
and completed status 👓 */
function validateProjectContent(req, res, next) {
  try {
    const project = req.body
    if (project.name || project.description || project.completed) {
      console.log('Project validation success')
      req.project = project
      next()
    } else {
      res.status(400).json({
        message: 'Need a name, description, and completed status for your request 💩'
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

module.exports = router