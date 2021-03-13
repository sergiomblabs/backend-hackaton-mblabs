/**
 * Base abstract controller to be extended by controllers
 */
export default class BaseController {
  constructor(model) {
    this.model = model;
  }

  /**
   * Gets a list of entities.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent
   */
  async get(req, res) {
    const query = {
      where: req.query.where || {},
      offset: +req.query.offset || 0,
      limit: +req.query.limit || Number.MAX_SAFE_INTEGER,
      order: [[req.query.order || "id", req.query.direction || "ASC"]]
    };

    if (req.query.fields) {
      query.attributes = req.query.fields;
    }

    const entities = await this.model.findAll(query);

    return res.json(entities);
  }

  /**
   * Gets a single instance of the entity.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent
   */
  async getOne(req, res) {
    const query = {
      plain: true
    };

    if (req.query.fields) {
      query.attributes = req.query.fields;
    }

    const entity = await this.model.findByPk(req.params.id, query);

    if (!entity) {
      return res.status(404).end();
    }

    return res.json(entity);
  }

  /**
   * Saves a new instance of the entity and returns it to the caller.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent
   */
  async post(req, res) {
    const entity = await this.model.create(req.body);

    return res.status(201).json(entity);
  }

  /**
   * Updates an entity and returns it to the caller.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent
   */
  async put(req, res) {
    const entity = await this.model.findByPk(req.params.id);

    entity.set(req.body);
    await entity.save();

    return res.json(entity);
  }

  /**
   * Deletes a single instance.
   *
   * @param {Request} req the request object
   * @param {Response} res the response object
   * @returns a promise that resolves to void after the response is sent
   */
  async delete(req, res) {
    await this.model.destroy({
      where: { id: req.params.id }
    });

    return res.status(202).end();
  }
}
