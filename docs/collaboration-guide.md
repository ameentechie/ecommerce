# ShopSmart Collaboration Guide

## Project Structure

The ShopSmart project is organized by features rather than teams, with a unified approach to development. The main feature areas include:

### Product & Catalog Features
- Product browsing, filtering, and display features
- Product-related components, state management, and API integration

### User & Authentication Features
- User authentication and profile management
- User-related components, state management, and API integration

### Shopping & Checkout Features
- Cart management and checkout process
- Cart-related components, state management, and API integration

## Git Workflow

### Branch Strategy
1. **Main Branch**: Production-ready code
2. **Development Branch**: Integration branch for testing
3. **Feature Branches**:
   - Format: `feature/feature-name`
   - Examples: `feature/product-grid`, `feature/cart-summary`

### Pull Request Process
1. Create feature branch from development branch
2. Implement feature
3. Push changes and create PR to development branch
4. Code review
5. Address feedback
6. Merge to development branch
7. Periodically merge development branch to main

## Code Review Guidelines

### What to Look For
- Adherence to architecture patterns
- Code quality and readability
- Proper error handling
- Performance considerations
- Responsive design
- Proper use of AI tools

### Review Comments
- Be specific and constructive
- Reference architecture patterns when applicable
- Suggest alternatives rather than just pointing out issues
- Use a positive and supportive tone

## AI Tool Usage Guidelines

### Effective Prompting
1. **Context Setting**: Always provide project context
   ```
   I'm working on the ShopSmart e-commerce project. I'm implementing the ProductCard component following our architecture patterns document.
   ```

2. **Specific Requests**: Be clear about what you need
   ```
   Please help me implement the ProductCard component that displays product image, title, price, and rating. It should follow our MUI styling pattern and include an "Add to Cart" button.
   ```

3. **Reference Existing Code**: Provide examples from the project
   ```
   We've already implemented a similar component for CartItem. Here's the structure we used: [paste code]
   ```

4. **Iterative Refinement**: Start simple, then refine
   ```
   First, let's create a basic version of the component, then we'll add styling and functionality.
   ```

### AI Tool Constraints Management

1. **Context Limitations**:
   - Break large components into smaller parts
   - Focus on one feature at a time
   - Reference documentation files for context

2. **Code Generation**:
   - Review AI-generated code carefully
   - Ensure it follows project patterns
   - Test functionality before committing

3. **Collaborative Usage**:
   - Share effective prompts with team members
   - Document AI-assisted implementations
   - Use AI for code reviews and suggestions

## Communication Channels

### Daily Standup
- Brief update on progress
- Blockers and challenges
- Plans for the day

### Project Sync (Twice Weekly)
- Feature demonstrations
- Integration planning
- Technical discussions
- Shared component updates
- API contract discussions

## Shared Resources

### API Documentation
- Fake Store API: https://fakestoreapi.com/docs
- Endpoints and data structures
- Authentication requirements

### Design System
- Material-UI components
- Custom theme configuration
- Responsive design guidelines

### Shared Components
- How to use common components
- Process for updating shared components
- Documentation requirements

## Problem-Solving Process

1. **Identify the Issue**:
   - Clearly define the problem
   - Gather relevant information

2. **Consult Documentation**:
   - Check project documentation
   - Review architecture patterns

3. **Use AI Tools**:
   - Provide clear context
   - Ask specific questions
   - Review and validate solutions

4. **Team Collaboration**:
   - Discuss with team members
   - Pair programming for complex issues

5. **Document Solution**:
   - Update documentation if needed
   - Share learnings with the team

## Feature Integration Points

### Product & Catalog → Shopping & Checkout
- Product data structure for cart items
- Product detail view for "Add to Cart" functionality
- Product search/filter state for user preferences

### User & Authentication → Product & Catalog
- User authentication state for personalized product recommendations

### Shopping & Checkout → Product & Catalog
- Cart state for "In Cart" indicators on product cards
- Order history for "Previously Purchased" indicators

## Performance Considerations

- Use memoization for expensive components
- Implement lazy loading for images
- Use pagination for large data sets
- Optimize Redux selectors
- Minimize re-renders

## Accessibility Guidelines

- Use semantic HTML elements
- Include proper ARIA attributes
- Ensure keyboard navigation
- Maintain sufficient color contrast
- Test with screen readers

## Documentation Requirements

- Update README.md with new features
- Document complex components with JSDoc comments
- Keep development-checklist.md updated
- Document API integration points
- Create usage examples for shared components
