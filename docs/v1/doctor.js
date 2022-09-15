/**
 * @openapi
 * tags:
 *  - name: Doctor
 *    description: Doctor endpoints operations
 */

/**
 * @openapi
 * paths:
 *  /dr:
 *    get:
 *      summary: Get all doctors
 *      description: Get all doctors
 *      tags:
 *        - Doctor
 *      responses:
 *        200:
 *          description: Success
 */

/**
 * @openapi
 *  /dr/{id}:
 *    get:
 *      tags:
 *        - Doctor
 *      summary: Get doctor by id
 *      description: Get doctor by id
 *      parameters:
 *        - name: id
 *          in: query
 *          schema:
 *            type: string
 *          example: 1527072d-b281-496e-bf18-0b6e8d933b1b
 *      responses:
 *        '200':
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example:
 *                message: OK
 *                data: {}
 *        '404':
 *          description: Not Found
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *              example:
 *                errors: Failed to find the requested source
 */


/**
 * @openapi
 *  /dr:
 *    post:
 *      tags:
 *        - Doctor
 *      summary: Add new doctor
 *      description: Add new doctor
 *      responses:
 *        200:
 *          description: Success
 */


/**
 * @openapi
 *  /dr:
 *    put:
 *      tags:
 *        - Doctor
 *      summary: Add new doctor
 *      description: Add new doctor
 *      responses:
 *        200:
 *          description: Success
 */